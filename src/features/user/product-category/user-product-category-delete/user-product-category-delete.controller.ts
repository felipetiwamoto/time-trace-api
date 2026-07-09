import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductCategoryDeleteRequest } from './user-product-category-delete.request.js';
import { userProductCategoryDeleteValidator } from './user-product-category-delete.validator.js';
import { userProductCategoryDeleteRepository } from './user-product-category-delete.repository.js';
import { userProductCategoryDeleteResponse } from './user-product-category-delete.response.js';

export const userProductCategoryDeleteController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductCategoryDeleteRequest;

		const validation = userProductCategoryDeleteValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductCategoryDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const deletedCategorys = await userProductCategoryDeleteRepository.deleteMany(
			validation.data.userAuthID,
			validation.data.ids,
		);
		if (!deletedCategorys?.count) {
			const message = 'Nenhuma categoria encontrada para remover';
			res.locals.response = snResponse<UserProductCategoryDeleteRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Categoria removida com sucesso';
		res.locals.response = {
			...snResponse<UserProductCategoryDeleteRequest>(StatusCodes.OK, message, null),
			payload: userProductCategoryDeleteResponse(),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
