import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userTaskUpdateRepository } from './user-task-update.repository.js';
import type { UserTaskUpdateRequest } from './user-task-update.request.js';
import { userTaskUpdateResponse } from './user-task-update.response.js';
import { userTaskUpdateValidator } from './user-task-update.validator.js';

export const userTaskUpdateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserTaskUpdateRequest;

		const validation = userTaskUpdateValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserTaskUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const task = await userTaskUpdateRepository.findByID(validation.data.userAuthID, validation.data.id);
		if (!task) {
			res.locals.response = snResponse<UserTaskUpdateRequest>(StatusCodes.BAD_REQUEST, 'Tarefa não encontrada', null);
			return next();
		}

		const project = await userTaskUpdateRepository.findProjectByID(validation.data.userAuthID, validation.data.projectID);
		if (!project) {
			res.locals.response = snResponse<UserTaskUpdateRequest>(StatusCodes.BAD_REQUEST, 'Projeto não encontrado', null);
			return next();
		}

		const alreadyExists = await userTaskUpdateRepository.findByName(
			validation.data.userAuthID,
			validation.data.projectID,
			validation.data.name,
			validation.data.id,
		);
		if (alreadyExists) {
			res.locals.response = snResponse<UserTaskUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				'Tarefa já cadastrada para este projeto',
				null,
			);
			return next();
		}

		const updatedTask = await userTaskUpdateRepository.update(
			validation.data.id,
			validation.data.projectID,
			validation.data.name,
			validation.data.description,
		);
		if (!updatedTask) {
			res.locals.response = snResponse<UserTaskUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				'Algo deu errado. Tente novamente mais tarde',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserTaskUpdateRequest>(StatusCodes.OK, 'Tarefa atualizada com sucesso', null),
			payload: userTaskUpdateResponse(updatedTask),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
