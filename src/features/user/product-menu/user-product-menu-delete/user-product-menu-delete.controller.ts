import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductMenuDeleteRequest } from './user-product-menu-delete.request.js';
import { userProductMenuDeleteValidator } from './user-product-menu-delete.validator.js';
import { userProductMenuDeleteRepository } from './user-product-menu-delete.repository.js';
import { userProductMenuDeleteResponse } from './user-product-menu-delete.response.js';

export const userProductMenuDeleteController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductMenuDeleteRequest;

		const validation = userProductMenuDeleteValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductMenuDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const deletedMenus = await userProductMenuDeleteRepository.deleteMany(
			validation.data.userAuthID,
			validation.data.ids,
		);
		if (!deletedMenus?.count) {
			const message = 'Nenhuma cardápio encontrada para remover';
			res.locals.response = snResponse<UserProductMenuDeleteRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Cardápio removida com sucesso';
		res.locals.response = {
			...snResponse<UserProductMenuDeleteRequest>(StatusCodes.OK, message, null),
			payload: userProductMenuDeleteResponse(),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
