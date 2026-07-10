import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userProjectUpdateRepository } from './user-project-update.repository.js';
import type { UserProjectUpdateRequest } from './user-project-update.request.js';
import { userProjectUpdateResponse } from './user-project-update.response.js';
import { userProjectUpdateValidator } from './user-project-update.validator.js';

export const userProjectUpdateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProjectUpdateRequest;

		const validation = userProjectUpdateValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserProjectUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const project = await userProjectUpdateRepository.findByID(validation.data.userAuthID, validation.data.id);
		if (!project) {
			res.locals.response = snResponse<UserProjectUpdateRequest>(StatusCodes.BAD_REQUEST, 'Projeto não encontrado', null);
			return next();
		}

		const alreadyExists = await userProjectUpdateRepository.findByName(
			validation.data.userAuthID,
			validation.data.name,
			validation.data.id,
		);
		if (alreadyExists) {
			res.locals.response = snResponse<UserProjectUpdateRequest>(StatusCodes.BAD_REQUEST, 'Projeto já cadastrado', null);
			return next();
		}

		const updatedProject = await userProjectUpdateRepository.update(validation.data.id, validation.data.name);
		if (!updatedProject) {
			res.locals.response = snResponse<UserProjectUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				'Algo deu errado. Tente novamente mais tarde',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserProjectUpdateRequest>(StatusCodes.OK, 'Projeto atualizado com sucesso', null),
			payload: userProjectUpdateResponse(updatedProject),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
