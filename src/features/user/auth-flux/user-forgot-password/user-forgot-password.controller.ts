import bcrypt from 'bcrypt';
import type { NextFunction, Request, Response } from 'express';
import { ReasonPhrases as StatusMessage, StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userForgotPasswordRepository } from './user-forgot-password.repository.js';
import type { UserForgotPasswordRequest } from './user-forgot-password.request.js';
import { userForgotPasswordResponse } from './user-forgot-password.response.js';
import { userForgotPasswordValidator } from './user-forgot-password.validator.js';
import { snAuthAPILib } from '../../../../core/libs/sn-auth-api.lib.js';

export const userForgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserForgotPasswordRequest;

		const validation = userForgotPasswordValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserForgotPasswordRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return next();
		}

		const response = await snAuthAPILib.forgotPassword({
			email: validation.data.email,
			newPassword: validation.data.newPassword,
			confirmNewPassword: validation.data.confirmNewPassword,
		});

		const payload = response?.data?.payload;

		const user = await userForgotPasswordRepository.findOrCreateByEmail(payload.email);

		if (!user) {
			const message = 'Erro interno do servidor';
			res.locals.response = snResponse<UserForgotPasswordRequest>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				message,
				null,
			);
			return next();
		}

		const message = 'Senha alterada com sucesso';
		res.locals.response = {
			...snResponse<UserForgotPasswordRequest>(StatusCodes.OK, message, null),
			payload: userForgotPasswordResponse({
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
