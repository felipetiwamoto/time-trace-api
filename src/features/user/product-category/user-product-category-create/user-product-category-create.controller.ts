import type { NextFunction, Request, Response } from 'express';
import { ReasonPhrases as StatusMessage, StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserproductCategoryCreateRequest } from './user-product-category-create.request.js';
import { userProductCategoryCreateValidator } from './user-product-category-create.validator.js';
import { userProductCategoryCreateRepository } from './user-product-category-create.repository.js';
import { userProductCategoryCreateResponse } from './user-product-category-create.response.js';

export const userProductCategoryCreateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserproductCategoryCreateRequest;

		const validation = userProductCategoryCreateValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserproductCategoryCreateRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const alreadyExists = await userProductCategoryCreateRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
		);
		if (alreadyExists) {
			const message = 'Categoria já cadastrada';
			res.locals.response = snResponse<UserproductCategoryCreateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const createdCategory = await userProductCategoryCreateRepository.create(
			validation.data.userAuthID,
			validation.data.name,
		);
		if (!createdCategory) {
			const message = 'Algo deu errado. Tente novamente mais tarde';
			res.locals.response = snResponse<UserproductCategoryCreateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Categoria criada com sucesso';
		res.locals.response = {
			...snResponse<UserproductCategoryCreateRequest>(StatusCodes.OK, message, null),
			payload: userProductCategoryCreateResponse(createdCategory),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
