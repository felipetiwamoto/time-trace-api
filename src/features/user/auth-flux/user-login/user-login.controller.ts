import type { NextFunction, Request, Response } from 'express';
import { ReasonPhrases as StatusMessage, StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import type { UserLoginRequest } from './user-login.request.js';
import { userLoginValidator } from './user-login.validator.js';
import { snAuthAPILib } from '../../../../core/libs/sn-auth-api.lib.js';
import { userLoginRepository } from './user-login.repository.js';
import { userLoginResponse } from './user-login.response.js';

export const userLoginController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserLoginRequest;

		const validation = userLoginValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserLoginRequest>(StatusCodes.BAD_REQUEST, message, validation.error);
			return next();
		}

		const response = await snAuthAPILib.login({
			email: validation.data.email,
			password: validation.data.password,
		});

		const payload = response?.data?.payload;

		const user = await userLoginRepository.findByEmail(payload.email);

		if (!user) {
			const message = 'Usuario não encontrado';
			res.locals.response = snResponse<UserLoginRequest>(StatusCodes.NOT_FOUND, message, null);
			return next();
		}

		const message = 'Usuario autenticado com sucesso';
		res.locals.response = {
			...snResponse<UserLoginRequest>(StatusCodes.OK, message, null),
			payload: userLoginResponse({
				id: String(user?.id),
				name: payload.name,
				email: payload.email,
			}),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
