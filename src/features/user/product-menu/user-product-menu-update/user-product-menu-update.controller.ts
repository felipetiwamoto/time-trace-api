import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductMenuUpdateRequest } from './user-product-menu-update.request.js';
import { userProductMenuUpdateValidator } from './user-product-menu-update.validator.js';
import { userProductMenuUpdateRepository } from './user-product-menu-update.repository.js';
import { userProductMenuUpdateResponse } from './user-product-menu-update.response.js';

export const userProductMenuUpdateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductMenuUpdateRequest;

		const validation = userProductMenuUpdateValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductMenuUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const existingMenu = await userProductMenuUpdateRepository.findByID(
			validation.data.userAuthID,
			validation.data.id,
		);
		if (!existingMenu) {
			const message = 'Cardápio não encontrada';
			res.locals.response = snResponse<UserProductMenuUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const alreadyExists = await userProductMenuUpdateRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
			validation.data.id,
		);
		if (alreadyExists) {
			const message = 'Cardápio já cadastrada';
			res.locals.response = snResponse<UserProductMenuUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const updatedMenu = await userProductMenuUpdateRepository.update(
			validation.data.id,
			validation.data.userAuthID,
			validation.data.name,
			validation.data.isActive,
		);
		if (!updatedMenu) {
			const message = 'Algo deu errado. Tente novamente mais tarde';
			res.locals.response = snResponse<UserProductMenuUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Cardápio atualizada com sucesso';
		res.locals.response = {
			...snResponse<UserProductMenuUpdateRequest>(StatusCodes.OK, message, null),
			payload: userProductMenuUpdateResponse(updatedMenu),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
