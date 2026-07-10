import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userTaskDeleteRepository } from './user-task-delete.repository.js';
import type { UserTaskDeleteRequest } from './user-task-delete.request.js';
import { userTaskDeleteResponse } from './user-task-delete.response.js';
import { userTaskDeleteValidator } from './user-task-delete.validator.js';

export const userTaskDeleteController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserTaskDeleteRequest;

		const validation = userTaskDeleteValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserTaskDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const deletedTasks = await userTaskDeleteRepository.deleteMany(validation.data.userAuthID, validation.data.ids);
		if (!deletedTasks?.count) {
			res.locals.response = snResponse<UserTaskDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				'Nenhuma tarefa encontrada para remover',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserTaskDeleteRequest>(StatusCodes.OK, 'Tarefa removida com sucesso', null),
			payload: userTaskDeleteResponse(),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
