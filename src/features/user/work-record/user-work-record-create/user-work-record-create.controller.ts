import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userWorkRecordCreateRepository } from './user-work-record-create.repository.js';
import type { UserWorkRecordCreateRequest } from './user-work-record-create.request.js';
import { userWorkRecordCreateResponse } from './user-work-record-create.response.js';
import { userWorkRecordCreateValidator } from './user-work-record-create.validator.js';

export const userWorkRecordCreateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserWorkRecordCreateRequest;
		const validation = userWorkRecordCreateValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserWorkRecordCreateRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const task = await userWorkRecordCreateRepository.findTaskByID(validation.data.userAuthID, validation.data.taskID);
		if (!task) {
			res.locals.response = snResponse<UserWorkRecordCreateRequest>(StatusCodes.BAD_REQUEST, 'Tarefa não encontrada', null);
			return next();
		}

		const activeRecord = await userWorkRecordCreateRepository.findActiveByTaskID(
			validation.data.userAuthID,
			validation.data.taskID,
		);
		if (activeRecord) {
			res.locals.response = snResponse<UserWorkRecordCreateRequest>(
				StatusCodes.BAD_REQUEST,
				'Esta tarefa já possui um registro em andamento',
				null,
			);
			return next();
		}

		const startedAt = validation.data.startedAt ? new Date(validation.data.startedAt) : new Date();
		const workRecord = await userWorkRecordCreateRepository.create(validation.data.userAuthID, task, startedAt);
		if (!workRecord) {
			res.locals.response = snResponse<UserWorkRecordCreateRequest>(
				StatusCodes.BAD_REQUEST,
				'Algo deu errado. Tente novamente mais tarde',
				null,
			);
			return next();
		}

		res.locals.response = {
			...snResponse<UserWorkRecordCreateRequest>(StatusCodes.OK, 'Registro iniciado com sucesso', null),
			payload: userWorkRecordCreateResponse(workRecord),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
