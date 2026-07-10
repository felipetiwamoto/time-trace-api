import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userTaskFindOneRepository } from './user-task-find-one.repository.js';
import type { UserTaskFindOneRequest } from './user-task-find-one.request.js';
import { userTaskFindOneResponse } from './user-task-find-one.response.js';
import { userTaskFindOneValidator } from './user-task-find-one.validator.js';

export const userTaskFindOneController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserTaskFindOneRequest;

		const validation = userTaskFindOneValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserTaskFindOneRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const task = await userTaskFindOneRepository.findByID(validation.data.userAuthID, validation.data.id);
		if (!task) {
			res.locals.response = snResponse<UserTaskFindOneRequest>(StatusCodes.BAD_REQUEST, 'Tarefa não encontrada', null);
			return next();
		}

		res.locals.response = {
			...snResponse<UserTaskFindOneRequest>(StatusCodes.OK, 'Tarefa encontrada com sucesso', null),
			payload: userTaskFindOneResponse(task),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
