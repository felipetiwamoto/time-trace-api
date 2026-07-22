import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userWorkRecordByPeriodRepository } from './user-work-record-by-period.repository.js';
import type { UserWorkRecordByPeriodRequest } from './user-work-record-by-period.request.js';
import { userWorkRecordByPeriodResponse } from './user-work-record-by-period.response.js';
import { userWorkRecordByPeriodValidator } from './user-work-record-by-period.validator.js';

export const userWorkRecordByPeriodController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserWorkRecordByPeriodRequest;

		const validation = userWorkRecordByPeriodValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserWorkRecordByPeriodRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisiÃ§Ã£o invÃ¡lido',
				validation.error,
			);
			return next();
		}

		const workRecords = await userWorkRecordByPeriodRepository.find(
			validation.data.userAuthID,
			new Date(validation.data.from),
			new Date(validation.data.to),
		);

		res.locals.response = {
			...snResponse<UserWorkRecordByPeriodRequest>(StatusCodes.OK, 'Registros encontrados com sucesso', null),
			payload: userWorkRecordByPeriodResponse(workRecords),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
