import type { NextFunction, Request, Response } from 'express';
import { ReasonPhrases as StatusMessage, StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductMenuCreateRequest } from './user-product-menu-create.request.js';
import { userProductMenuValidator } from './user-product-menu-create.validator.js';
import { userProductMenuRepository } from './user-product-menu-create.repository.js';
import { userProductMenuResponse } from './user-product-menu-create.response.js';

export const userProductMenuController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductMenuCreateRequest;

		const validation = userProductMenuValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductMenuCreateRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const alreadyExists = await userProductMenuRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
		);
		if (alreadyExists) {
			const message = 'Cardápio já cadastrada';
			res.locals.response = snResponse<UserProductMenuCreateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const createdMenu = await userProductMenuRepository.create(
			validation.data.userAuthID,
			validation.data.name,
			validation.data.isActive,
		);
		if (!createdMenu) {
			const message = 'Algo deu errado. Tente novamente mais tarde';
			res.locals.response = snResponse<UserProductMenuCreateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Cardápio criada com sucesso';
		res.locals.response = {
			...snResponse<UserProductMenuCreateRequest>(StatusCodes.OK, message, null),
			payload: userProductMenuResponse(createdMenu),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
