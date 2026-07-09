import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductDeleteRequest } from './user-product-delete.request.js';
import { userProductDeleteRepository } from './user-product-delete.repository.js';
import { userProductDeleteResponse } from './user-product-delete.response.js';
import { userProductDeleteValidator } from './user-product-delete.validator.js';

export const userProductDeleteController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductDeleteRequest;

		const validation = userProductDeleteValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const deletedProducts = await userProductDeleteRepository.deleteMany(
			validation.data.userAuthID,
			validation.data.ids,
		);
		if (!deletedProducts?.count) {
			const message = 'Nenhum produto encontrado para remover';
			res.locals.response = snResponse<UserProductDeleteRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Produto removido com sucesso';
		res.locals.response = {
			...snResponse<UserProductDeleteRequest>(StatusCodes.OK, message, null),
			payload: userProductDeleteResponse(),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
