import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userWorkRecordByProjectRepository } from './user-work-record-by-project.repository.js';
import type { UserWorkRecordByProjectRequest } from './user-work-record-by-project.request.js';
import { userWorkRecordByProjectResponse } from './user-work-record-by-project.response.js';
import { userWorkRecordByProjectValidator } from './user-work-record-by-project.validator.js';

export const userWorkRecordByProjectController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserWorkRecordByProjectRequest;

		const validation = userWorkRecordByProjectValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserWorkRecordByProjectRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisiÃ§Ã£o invÃ¡lido',
				validation.error,
			);
			return next();
		}

		const take = validation.data.take ?? 100;
		const skip = (validation.data.skip ?? 0) * take;
		const projects = await userWorkRecordByProjectRepository.find(validation.data.userAuthID, take, skip);

		res.locals.response = {
			...snResponse<UserWorkRecordByProjectRequest>(StatusCodes.OK, 'Registros encontrados com sucesso', null),
			payload: userWorkRecordByProjectResponse(projects),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
