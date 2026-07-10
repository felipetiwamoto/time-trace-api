import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userProjectFindOneRepository } from './user-project-find-one.repository.js';
import type { UserProjectFindOneRequest } from './user-project-find-one.request.js';
import { userProjectFindOneResponse } from './user-project-find-one.response.js';
import { userProjectFindOneValidator } from './user-project-find-one.validator.js';

export const userProjectFindOneController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProjectFindOneRequest;

		const validation = userProjectFindOneValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserProjectFindOneRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const project = await userProjectFindOneRepository.findByID(validation.data.userAuthID, validation.data.id);
		if (!project) {
			res.locals.response = snResponse<UserProjectFindOneRequest>(StatusCodes.BAD_REQUEST, 'Projeto não encontrado', null);
			return next();
		}

		res.locals.response = {
			...snResponse<UserProjectFindOneRequest>(StatusCodes.OK, 'Projeto encontrado com sucesso', null),
			payload: userProjectFindOneResponse(project),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
