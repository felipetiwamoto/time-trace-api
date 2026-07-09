import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductFindOneRequest } from './user-product-find-one.request.js';
import { userProductFindOneRepository } from './user-product-find-one.repository.js';
import { userProductFindOneResponse } from './user-product-find-one.response.js';
import { userProductFindOneValidator } from './user-product-find-one.validator.js';

export const userProductFindOneController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductFindOneRequest;

		const validation = userProductFindOneValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductFindOneRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const product = await userProductFindOneRepository.findByID(validation.data.userAuthID, validation.data.id);
		if (!product) {
			const message = 'Produto não encontrado';
			res.locals.response = snResponse<UserProductFindOneRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Produto encontrado com sucesso';
		res.locals.response = {
			...snResponse<UserProductFindOneRequest>(StatusCodes.OK, message, null),
			payload: userProductFindOneResponse(product),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
