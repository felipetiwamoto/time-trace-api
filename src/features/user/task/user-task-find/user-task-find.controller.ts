import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userTaskFindRepository } from './user-task-find.repository.js';
import type { UserTaskFindRequest } from './user-task-find.request.js';
import { userTaskFindResponse } from './user-task-find.response.js';
import { userTaskFindValidator } from './user-task-find.validator.js';

export const userTaskFindController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserTaskFindRequest;

		const validation = userTaskFindValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserTaskFindRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const take = validation.data.take ?? 20;
		const skip = (validation.data.skip ?? 0) * take;
		const tasks = await userTaskFindRepository.find(
			validation.data.userAuthID,
			take,
			skip,
			validation.data.projectID,
		);

		res.locals.response = {
			...snResponse<UserTaskFindRequest>(StatusCodes.OK, 'Tarefas encontradas com sucesso', null),
			payload: userTaskFindResponse(tasks),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
