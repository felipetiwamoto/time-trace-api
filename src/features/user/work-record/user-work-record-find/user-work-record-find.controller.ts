import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userWorkRecordFindRepository } from './user-work-record-find.repository.js';
import type { UserWorkRecordFindRequest } from './user-work-record-find.request.js';
import { userWorkRecordFindResponse } from './user-work-record-find.response.js';
import { userWorkRecordFindValidator } from './user-work-record-find.validator.js';

export const userWorkRecordFindController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserWorkRecordFindRequest;
		const validation = userWorkRecordFindValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserWorkRecordFindRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const take = validation.data.take ?? 100;
		const skip = (validation.data.skip ?? 0) * take;
		const workRecords = await userWorkRecordFindRepository.find(validation.data.userAuthID, take, skip, {
			taskID: validation.data.taskID,
			startedAtFrom: validation.data.startedAtFrom ? new Date(validation.data.startedAtFrom) : undefined,
			startedAtTo: validation.data.startedAtTo ? new Date(validation.data.startedAtTo) : undefined,
		});

		res.locals.response = {
			...snResponse<UserWorkRecordFindRequest>(StatusCodes.OK, 'Registros encontrados com sucesso', null),
			payload: userWorkRecordFindResponse(workRecords),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
