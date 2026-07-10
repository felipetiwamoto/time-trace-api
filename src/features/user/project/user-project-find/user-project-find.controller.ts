import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userProjectFindRepository } from './user-project-find.repository.js';
import type { UserProjectFindRequest } from './user-project-find.request.js';
import { userProjectFindResponse } from './user-project-find.response.js';
import { userProjectFindValidator } from './user-project-find.validator.js';

export const userProjectFindController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserProjectFindRequest;

		const validation = userProjectFindValidator.safeParse(body);
		if (!validation.success) {
			res.locals.response = snResponse<UserProjectFindRequest>(
				StatusCodes.BAD_REQUEST,
				'Corpo da requisição inválido',
				validation.error,
			);
			return next();
		}

		const take = validation.data.take ?? 20;
		const skip = (validation.data.skip ?? 0) * take;
		const projects = await userProjectFindRepository.find(validation.data.userAuthID, take, skip);

		res.locals.response = {
			...snResponse<UserProjectFindRequest>(StatusCodes.OK, 'Projetos encontrados com sucesso', null),
			payload: userProjectFindResponse(projects),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
