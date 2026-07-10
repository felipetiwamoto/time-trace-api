import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userWorkRecordDeleteRepository } from './user-work-record-delete.repository.js';
import type { UserWorkRecordDeleteRequest } from './user-work-record-delete.request.js';
import { userWorkRecordDeleteResponse } from './user-work-record-delete.response.js';
import { userWorkRecordDeleteValidator } from './user-work-record-delete.validator.js';

export const userWorkRecordDeleteController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserWorkRecordDeleteRequest;
		const validation = userWorkRecordDeleteValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserWorkRecordDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const deletedRecords = await userWorkRecordDeleteRepository.deleteMany(validation.data.userAuthID, validation.data.ids);
		if (!deletedRecords?.count) {
			res.locals.response = snResponse<UserWorkRecordDeleteRequest>(
				StatusCodes.BAD_REQUEST,
				'Nenhum registro encontrado para remover',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserWorkRecordDeleteRequest>(StatusCodes.OK, 'Registro removido com sucesso', null),
			payload: userWorkRecordDeleteResponse(),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
