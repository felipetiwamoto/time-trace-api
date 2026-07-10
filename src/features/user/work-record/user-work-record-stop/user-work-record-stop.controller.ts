import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userWorkRecordStopRepository } from './user-work-record-stop.repository.js';
import type { UserWorkRecordStopRequest } from './user-work-record-stop.request.js';
import { userWorkRecordStopResponse } from './user-work-record-stop.response.js';
import { userWorkRecordStopValidator } from './user-work-record-stop.validator.js';

export const userWorkRecordStopController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserWorkRecordStopRequest;
		const validation = userWorkRecordStopValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserWorkRecordStopRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const existingRecord = await userWorkRecordStopRepository.findByID(validation.data.userAuthID, validation.data.id);
		if (!existingRecord) {
			res.locals.response = snResponse<UserWorkRecordStopRequest>(StatusCodes.BAD_REQUEST, 'Registro não encontrado', null);
			return next();
		}

		if (existingRecord.stoppedAt) {
			res.locals.response = snResponse<UserWorkRecordStopRequest>(StatusCodes.BAD_REQUEST, 'Registro já finalizado', null);
			return next();
		}

		const stoppedAt = validation.data.stoppedAt ? new Date(validation.data.stoppedAt) : new Date();
		if (stoppedAt < existingRecord.startedAt) {
			res.locals.response = snResponse<UserWorkRecordStopRequest>(
				StatusCodes.BAD_REQUEST,
				'O fim deve ser posterior ao início',
				null,
			);
			return next();
		}

		const workRecord = await userWorkRecordStopRepository.stop(validation.data.id, stoppedAt);
		if (!workRecord) {
			res.locals.response = snResponse<UserWorkRecordStopRequest>(
				StatusCodes.BAD_REQUEST,
				'Algo deu errado. Tente novamente mais tarde',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserWorkRecordStopRequest>(StatusCodes.OK, 'Registro finalizado com sucesso', null),
			payload: userWorkRecordStopResponse(workRecord),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
