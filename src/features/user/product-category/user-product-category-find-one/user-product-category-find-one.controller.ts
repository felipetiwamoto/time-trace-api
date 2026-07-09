import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductCategoryFindOneRequest } from './user-product-category-find-one.request.js';
import { userProductCategoryFindOneValidator } from './user-product-category-find-one.validator.js';
import { userProductCategoryFindOneRepository } from './user-product-category-find-one.repository.js';
import { userProductCategoryFindOneResponse } from './user-product-category-find-one.response.js';

export const userProductCategoryFindOneController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductCategoryFindOneRequest;

		const validation = userProductCategoryFindOneValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductCategoryFindOneRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const productCategory = await userProductCategoryFindOneRepository.findByID(
			validation.data.userAuthID,
			validation.data.id,
		);
		if (!productCategory) {
			const message = 'Categoria não encontrada';
			res.locals.response = snResponse<UserProductCategoryFindOneRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Categoria encontrada com sucesso';
		res.locals.response = {
			...snResponse<UserProductCategoryFindOneRequest>(StatusCodes.OK, message, null),
			payload: userProductCategoryFindOneResponse(productCategory),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
