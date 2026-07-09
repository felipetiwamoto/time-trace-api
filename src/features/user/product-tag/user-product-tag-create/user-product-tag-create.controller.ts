import type { NextFunction, Request, Response } from 'express';
import { ReasonPhrases as StatusMessage, StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductTagCreateRequest } from './user-product-tag-create.request.js';
import { userProductTagValidator } from './user-product-tag-create.validator.js';
import { userProductTagRepository } from './user-product-tag-create.repository.js';
import { userProductTagResponse } from './user-product-tag-create.response.js';

export const userProductTagController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductTagCreateRequest;

		const validation = userProductTagValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductTagCreateRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const alreadyExists = await userProductTagRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
		);
		if (alreadyExists) {
			const message = 'Tag já cadastrada';
			res.locals.response = snResponse<UserProductTagCreateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const createdTag = await userProductTagRepository.create(validation.data.userAuthID, validation.data.name);
		if (!createdTag) {
			const message = 'Algo deu errado. Tente novamente mais tarde';
			res.locals.response = snResponse<UserProductTagCreateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Tag criada com sucesso';
		res.locals.response = {
			...snResponse<UserProductTagCreateRequest>(StatusCodes.OK, message, null),
			payload: userProductTagResponse(createdTag),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
