import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductTagFindRequest } from './user-product-tag-find.request.js';
import { userProductTagFindValidator } from './user-product-tag-find.validator.js';
import { userProductTagFindRepository } from './user-product-tag-find.repository.js';
import { userProductTagFindResponse } from './user-product-tag-find.response.js';

export const userProductTagFindController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductTagFindRequest;

		const validation = userProductTagFindValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductTagFindRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const take = validation.data.take ?? 20;
		const skip = (validation.data.skip ?? 0) * take;
		const productTags = await userProductTagFindRepository.find(validation.data.userAuthID, take, skip);

		const message = 'Tags encontradas com sucesso';
		res.locals.response = {
			...snResponse<UserProductTagFindRequest>(StatusCodes.OK, message, null),
			payload: userProductTagFindResponse(productTags),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
