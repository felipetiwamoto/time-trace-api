import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductTagDeleteRequest } from './user-product-tag-delete.request.js';
import { userProductTagDeleteValidator } from './user-product-tag-delete.validator.js';
import { userProductTagDeleteRepository } from './user-product-tag-delete.repository.js';
import { userProductTagDeleteResponse } from './user-product-tag-delete.response.js';

export const userProductTagDeleteController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductTagDeleteRequest;

		const validation = userProductTagDeleteValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductTagDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const deletedTags = await userProductTagDeleteRepository.deleteMany(
			validation.data.userAuthID,
			validation.data.ids,
		);
		if (!deletedTags?.count) {
			const message = 'Nenhuma tag encontrada para remover';
			res.locals.response = snResponse<UserProductTagDeleteRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Tag removida com sucesso';
		res.locals.response = {
			...snResponse<UserProductTagDeleteRequest>(StatusCodes.OK, message, null),
			payload: userProductTagDeleteResponse(),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
