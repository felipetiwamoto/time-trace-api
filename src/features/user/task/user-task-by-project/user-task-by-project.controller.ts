import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userTaskByProjectRepository } from './user-task-by-project.repository.js';
import type { UserTaskByProjectRequest } from './user-task-by-project.request.js';
import { userTaskByProjectResponse } from './user-task-by-project.response.js';
import { userTaskByProjectValidator } from './user-task-by-project.validator.js';

export const userTaskByProjectController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserTaskByProjectRequest;

		const validation = userTaskByProjectValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserTaskByProjectRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const take = validation.data.take ?? 100;
		const skip = (validation.data.skip ?? 0) * take;
		const projects = await userTaskByProjectRepository.find(validation.data.userAuthID, take, skip);

		res.locals.response = {
			...snResponse<UserTaskByProjectRequest>(StatusCodes.OK, 'Tarefas encontradas com sucesso', null),
			payload: userTaskByProjectResponse(projects),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
