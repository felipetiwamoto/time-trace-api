import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userProjectDeleteRepository } from './user-project-delete.repository.js';
import type { UserProjectDeleteRequest } from './user-project-delete.request.js';
import { userProjectDeleteResponse } from './user-project-delete.response.js';
import { userProjectDeleteValidator } from './user-project-delete.validator.js';

export const userProjectDeleteController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProjectDeleteRequest;

		const validation = userProjectDeleteValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserProjectDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const deletedProjects = await userProjectDeleteRepository.deleteMany(validation.data.userAuthID, validation.data.ids);
		if (!deletedProjects?.count) {
			res.locals.response = snResponse<UserProjectDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				'Nenhum projeto encontrado para remover',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserProjectDeleteRequest>(StatusCodes.OK, 'Projeto removido com sucesso', null),
			payload: userProjectDeleteResponse(),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
