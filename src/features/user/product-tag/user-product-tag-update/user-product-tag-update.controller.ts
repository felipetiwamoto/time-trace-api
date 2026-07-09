import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserProductTagUpdateRequest } from './user-product-tag-update.request.js';
import { userProductTagUpdateValidator } from './user-product-tag-update.validator.js';
import { userProductTagUpdateRepository } from './user-product-tag-update.repository.js';
import { userProductTagUpdateResponse } from './user-product-tag-update.response.js';

export const userProductTagUpdateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProductTagUpdateRequest;

		const validation = userProductTagUpdateValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserProductTagUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const existingTag = await userProductTagUpdateRepository.findByID(
			validation.data.userAuthID,
			validation.data.id,
		);
		if (!existingTag) {
			const message = 'Tag não encontrada';
			res.locals.response = snResponse<UserProductTagUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const alreadyExists = await userProductTagUpdateRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
			validation.data.id,
		);
		if (alreadyExists) {
			const message = 'Tag já cadastrada';
			res.locals.response = snResponse<UserProductTagUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const updatedTag = await userProductTagUpdateRepository.update(validation.data.id, validation.data.name);
		if (!updatedTag) {
			const message = 'Algo deu errado. Tente novamente mais tarde';
			res.locals.response = snResponse<UserProductTagUpdateRequest>(StatusCodes.BAD_REQUEST, message, null);
			return next();
		}

		const message = 'Tag atualizada com sucesso';
		res.locals.response = {
			...snResponse<UserProductTagUpdateRequest>(StatusCodes.OK, message, null),
			payload: userProductTagUpdateResponse(updatedTag),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
