import type { NextFunction, Request, Response } from 'express';
import type { UserTwoFactorAuthInitRequest } from './user-two-factor-auth-init.request.js';
import { userTwoFactorAuthInitValidator } from './user-two-factor-auth-init.validator.js';
import { StatusCodes, ReasonPhrases as StatusMessage } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { snAuthAPILib } from '../../../../core/libs/sn-auth-api.lib.js';

export const userTwoFactorAuthInitController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserTwoFactorAuthInitRequest;

		const validation = userTwoFactorAuthInitValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserTwoFactorAuthInitRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return res.status(400).json({ message, errors: validation.error.issues });
		}

		const response = await snAuthAPILib.twoFactorAuthInit({
			email: validation.data.email,
			tokenContext: validation.data.tokenContext,
		});

		const message = 'Token de autenticação em dois fatores gerado com sucesso';
		res.locals.response = snResponse<UserTwoFactorAuthInitRequest>(StatusCodes.OK, message, null);
		next();
	} catch (error) {
		next(error);
	}
};
