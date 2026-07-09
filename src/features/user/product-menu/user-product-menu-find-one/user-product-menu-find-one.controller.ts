import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductMenuFindOneRequest } from './user-product-menu-find-one.request.js';
import { userProductMenuFindOneValidator } from './user-product-menu-find-one.validator.js';
import { userProductMenuFindOneRepository } from './user-product-menu-find-one.repository.js';
import { userProductMenuFindOneResponse } from './user-product-menu-find-one.response.js';

export const userProductMenuFindOneController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductMenuFindOneRequest;

		const validation = userProductMenuFindOneValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductMenuFindOneRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const productMenu = await userProductMenuFindOneRepository.findByID(
			validation.data.userAuthID,
			validation.data.id,
		);
		if (!productMenu) {
			const message = 'Cardápio não encontrada';
			res.locals.response = snResponse<UserProductMenuFindOneRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Cardápio encontrada com sucesso';
		res.locals.response = {
			...snResponse<UserProductMenuFindOneRequest>(StatusCodes.OK, message, null),
			payload: userProductMenuFindOneResponse(productMenu),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
