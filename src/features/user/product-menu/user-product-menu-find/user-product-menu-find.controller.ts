import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductMenuFindRequest } from './user-product-menu-find.request.js';
import { userProductMenuFindValidator } from './user-product-menu-find.validator.js';
import { userProductMenuFindRepository } from './user-product-menu-find.repository.js';
import { userProductMenuFindResponse } from './user-product-menu-find.response.js';

export const userProductMenuFindController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductMenuFindRequest;

		const validation = userProductMenuFindValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductMenuFindRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const take = validation.data.take ?? 20;
		const skip = (validation.data.skip ?? 0) * take;
		const productCategories = await userProductMenuFindRepository.find(validation.data.userAuthID, take, skip);

		const message = 'Cardápios encontradas com sucesso';
		res.locals.response = {
			...snResponse<UserProductMenuFindRequest>(StatusCodes.OK, message, null),
			payload: userProductMenuFindResponse(productCategories),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
