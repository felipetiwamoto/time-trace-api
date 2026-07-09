import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { parseUserProductPayload } from '../user-product.helper.js';
import type { UserProductUpdateRequest } from './user-product-update.request.js';
import { userProductUpdateRepository } from './user-product-update.repository.js';
import { userProductUpdateResponse } from './user-product-update.response.js';
import { userProductUpdateValidator } from './user-product-update.validator.js';

export const userProductUpdateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = parseUserProductPayload(req) as UserProductUpdateRequest;

		const validation = userProductUpdateValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisicao invalido';
			res.locals.response = snResponse<UserProductUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const existingProduct = await userProductUpdateRepository.findByID(
			validation.data.userAuthID,
			validation.data.id,
		);
		if (!existingProduct) {
			const message = 'Produto nao encontrado';
			res.locals.response = snResponse<UserProductUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const alreadyExists = await userProductUpdateRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
			validation.data.id,
		);
		if (alreadyExists) {
			const message = 'Produto ja cadastrado';
			res.locals.response = snResponse<UserProductUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const updatedProduct = await userProductUpdateRepository.update(validation.data);
		if (!updatedProduct) {
			const message = 'Algo deu errado. Tente novamente mais tarde';
			res.locals.response = snResponse<UserProductUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Produto atualizado com sucesso';
		res.locals.response = {
			...snResponse<UserProductUpdateRequest>(StatusCodes.OK, message, null),
			payload: userProductUpdateResponse(updatedProduct),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
