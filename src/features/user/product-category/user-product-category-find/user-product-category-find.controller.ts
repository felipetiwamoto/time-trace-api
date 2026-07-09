import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductCategoryFindRequest } from './user-product-category-find.request.js';
import { userProductCategoryFindValidator } from './user-product-category-find.validator.js';
import { userProductCategoryFindRepository } from './user-product-category-find.repository.js';
import { userProductCategoryFindResponse } from './user-product-category-find.response.js';

export const userProductCategoryFindController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductCategoryFindRequest;

		const validation = userProductCategoryFindValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductCategoryFindRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const take = validation.data.take ?? 20;
		const skip = (validation.data.skip ?? 0) * take;
		const productCategories = await userProductCategoryFindRepository.find(validation.data.userAuthID, take, skip);

		const message = 'Categorias encontradas com sucesso';
		res.locals.response = {
			...snResponse<UserProductCategoryFindRequest>(StatusCodes.OK, message, null),
			payload: userProductCategoryFindResponse(productCategories),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
