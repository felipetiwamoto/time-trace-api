import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductCreateRequest } from './user-product-create.request.js';
import { userProductCreateRepository } from './user-product-create.repository.js';
import { userProductCreateResponse } from './user-product-create.response.js';
import { userProductCreateValidator } from './user-product-create.validator.js';

export const userProductCreateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductCreateRequest;

		const validation = userProductCreateValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisicao invalido';
			res.locals.response = snResponse<UserProductCreateRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const alreadyExists = await userProductCreateRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
		);
		if (alreadyExists) {
			const message = 'Produto ja cadastrado';
			res.locals.response = snResponse<UserProductCreateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const createdProduct = await userProductCreateRepository.create(validation.data);
		if (!createdProduct) {
			const message = 'Algo deu errado. Tente novamente mais tarde';
			res.locals.response = snResponse<UserProductCreateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Produto criado com sucesso';
		res.locals.response = {
			...snResponse<UserProductCreateRequest>(StatusCodes.OK, message, null),
			payload: userProductCreateResponse(createdProduct),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
