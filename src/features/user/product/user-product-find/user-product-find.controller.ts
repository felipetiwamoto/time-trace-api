import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductFindRequest } from './user-product-find.request.js';
import { userProductFindRepository } from './user-product-find.repository.js';
import { userProductFindResponse } from './user-product-find.response.js';
import { userProductFindValidator } from './user-product-find.validator.js';

export const userProductFindController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductFindRequest;

		const validation = userProductFindValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductFindRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const take = validation.data.take ?? 20;
		const skip = (validation.data.skip ?? 0) * take;
		const products = await userProductFindRepository.find(validation.data.userAuthID, take, skip);

		const message = 'Produtos encontrados com sucesso';
		res.locals.response = {
			...snResponse<UserProductFindRequest>(StatusCodes.OK, message, null),
			payload: userProductFindResponse(products),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
