import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductCategoryUpdateRequest } from './user-product-category-update.request.js';
import { userProductCategoryUpdateValidator } from './user-product-category-update.validator.js';
import { userProductCategoryUpdateRepository } from './user-product-category-update.repository.js';
import { userProductCategoryUpdateResponse } from './user-product-category-update.response.js';

export const userProductCategoryUpdateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductCategoryUpdateRequest;

		const validation = userProductCategoryUpdateValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductCategoryUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const existingCategory = await userProductCategoryUpdateRepository.findByID(
			validation.data.userAuthID,
			validation.data.id,
		);
		if (!existingCategory) {
			const message = 'Categoria não encontrada';
			res.locals.response = snResponse<UserProductCategoryUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const alreadyExists = await userProductCategoryUpdateRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
			validation.data.id,
		);
		if (alreadyExists) {
			const message = 'Categoria já cadastrada';
			res.locals.response = snResponse<UserProductCategoryUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const updatedCategory = await userProductCategoryUpdateRepository.update(
			validation.data.id,
			validation.data.name,
		);
		if (!updatedCategory) {
			const message = 'Algo deu errado. Tente novamente mais tarde';
			res.locals.response = snResponse<UserProductCategoryUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Categoria atualizada com sucesso';
		res.locals.response = {
			...snResponse<UserProductCategoryUpdateRequest>(StatusCodes.OK, message, null),
			payload: userProductCategoryUpdateResponse(updatedCategory),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
