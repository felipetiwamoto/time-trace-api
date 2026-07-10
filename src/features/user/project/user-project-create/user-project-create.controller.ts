import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userProjectCreateRepository } from './user-project-create.repository.js';
import type { UserProjectCreateRequest } from './user-project-create.request.js';
import { userProjectCreateResponse } from './user-project-create.response.js';
import { userProjectCreateValidator } from './user-project-create.validator.js';

export const userProjectCreateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProjectCreateRequest;

		const validation = userProjectCreateValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserProjectCreateRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const alreadyExists = await userProjectCreateRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
		);
		if (alreadyExists) {
			res.locals.response = snResponse<UserProjectCreateRequest>(StatusCodes.BAD_REQUEST, 'Projeto já cadastrado', null);
			return next();
		}

		const project = await userProjectCreateRepository.create(validation.data.userAuthID, validation.data.name);
		if (!project) {
			res.locals.response = snResponse<UserProjectCreateRequest>(
				StatusCodes.BAD_REQUEST,
				'Algo deu errado. Tente novamente mais tarde',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserProjectCreateRequest>(StatusCodes.OK, 'Projeto criado com sucesso', null),
			payload: userProjectCreateResponse(project),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
