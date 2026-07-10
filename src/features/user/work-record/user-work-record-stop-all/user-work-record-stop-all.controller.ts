import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userWorkRecordStopAllRepository } from './user-work-record-stop-all.repository.js';
import type { UserWorkRecordStopAllRequest } from './user-work-record-stop-all.request.js';
import { userWorkRecordStopAllResponse } from './user-work-record-stop-all.response.js';
import { userWorkRecordStopAllValidator } from './user-work-record-stop-all.validator.js';

export const userWorkRecordStopAllController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserWorkRecordStopAllRequest;
		const validation = userWorkRecordStopAllValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserWorkRecordStopAllRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const stoppedAt = validation.data.stoppedAt ? new Date(validation.data.stoppedAt) : new Date();
		const stoppedRecords = await userWorkRecordStopAllRepository.stopAll(validation.data.userAuthID, stoppedAt);
		if (!stoppedRecords) {
			res.locals.response = snResponse<UserWorkRecordStopAllRequest>(
				StatusCodes.BAD_REQUEST,
				'Algo deu errado. Tente novamente mais tarde',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserWorkRecordStopAllRequest>(StatusCodes.OK, 'Registros finalizados com sucesso', null),
			payload: userWorkRecordStopAllResponse(stoppedRecords.count),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
