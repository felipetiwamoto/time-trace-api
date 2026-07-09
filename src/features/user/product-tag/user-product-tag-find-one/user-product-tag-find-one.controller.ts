import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductTagFindOneRequest } from './user-product-tag-find-one.request.js';
import { userProductTagFindOneValidator } from './user-product-tag-find-one.validator.js';
import { userProductTagFindOneRepository } from './user-product-tag-find-one.repository.js';
import { userProductTagFindOneResponse } from './user-product-tag-find-one.response.js';

export const userProductTagFindOneController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductTagFindOneRequest;

		const validation = userProductTagFindOneValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductTagFindOneRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const productTag = await userProductTagFindOneRepository.findByID(
			validation.data.userAuthID,
			validation.data.id,
		);
		if (!productTag) {
			const message = 'Tag não encontrada';
			res.locals.response = snResponse<UserProductTagFindOneRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Tag encontrada com sucesso';
		res.locals.response = {
			...snResponse<UserProductTagFindOneRequest>(StatusCodes.OK, message, null),
			payload: userProductTagFindOneResponse(productTag),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
