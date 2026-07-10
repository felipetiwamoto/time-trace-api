import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userWorkRecordUpdateRepository } from './user-work-record-update.repository.js';
import type { UserWorkRecordUpdateRequest } from './user-work-record-update.request.js';
import { userWorkRecordUpdateResponse } from './user-work-record-update.response.js';
import { userWorkRecordUpdateValidator } from './user-work-record-update.validator.js';

export const userWorkRecordUpdateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserWorkRecordUpdateRequest;
		const validation = userWorkRecordUpdateValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserWorkRecordUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const existingRecord = await userWorkRecordUpdateRepository.findByID(validation.data.userAuthID, validation.data.id);
		if (!existingRecord) {
			res.locals.response = snResponse<UserWorkRecordUpdateRequest>(StatusCodes.BAD_REQUEST, 'Registro não encontrado', null);
			return next();
		}

		const workRecord = await userWorkRecordUpdateRepository.update(
			validation.data.id,
			new Date(validation.data.startedAt),
			new Date(validation.data.stoppedAt),
		);
		if (!workRecord) {
			res.locals.response = snResponse<UserWorkRecordUpdateRequest>(
				StatusCodes.BAD_REQUEST,
				'Algo deu errado. Tente novamente mais tarde',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserWorkRecordUpdateRequest>(StatusCodes.OK, 'Registro atualizado com sucesso', null),
			payload: userWorkRecordUpdateResponse(workRecord),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
