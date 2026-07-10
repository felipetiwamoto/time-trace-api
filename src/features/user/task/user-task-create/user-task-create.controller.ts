import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userTaskCreateRepository } from './user-task-create.repository.js';
import type { UserTaskCreateRequest } from './user-task-create.request.js';
import { userTaskCreateResponse } from './user-task-create.response.js';
import { userTaskCreateValidator } from './user-task-create.validator.js';

export const userTaskCreateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserTaskCreateRequest;

		const validation = userTaskCreateValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserTaskCreateRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const project = await userTaskCreateRepository.findProjectByID(validation.data.userAuthID, validation.data.projectID);
		if (!project) {
			res.locals.response = snResponse<UserTaskCreateRequest>(StatusCodes.BAD_REQUEST, 'Projeto não encontrado', null);
			return next();
		}

		const alreadyExists = await userTaskCreateRepository.findByName(
			validation.data.userAuthID,
			validation.data.projectID,
			validation.data.name,
		);
		if (alreadyExists) {
			res.locals.response = snResponse<UserTaskCreateRequest>(
				StatusCodes.BAD_REQUEST,
				'Tarefa já cadastrada para este projeto',
				null,
			);
			return next();
		}

		const task = await userTaskCreateRepository.create(
			validation.data.userAuthID,
			validation.data.projectID,
			validation.data.name,
			validation.data.description,
		);
		if (!task) {
			res.locals.response = snResponse<UserTaskCreateRequest>(
				StatusCodes.BAD_REQUEST,
				'Algo deu errado. Tente novamente mais tarde',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserTaskCreateRequest>(StatusCodes.OK, 'Tarefa criada com sucesso', null),
			payload: userTaskCreateResponse(task),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
