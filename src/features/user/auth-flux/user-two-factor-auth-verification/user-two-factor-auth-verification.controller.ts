import type { NextFunction, Request, Response } from 'express';
import type { UserTwoFactorAuthVerificationRequest } from './user-two-factor-auth-verification.request.js';
import { userTwoFactorAuthVerificationValidator } from './user-two-factor-auth-verification.validator.js';
import { StatusCodes, ReasonPhrases as StatusMessage } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { snAuthAPILib } from '../../../../core/libs/sn-auth-api.lib.js';

export const userTwoFactorAuthVerificationController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserTwoFactorAuthVerificationRequest;

		const validation = userTwoFactorAuthVerificationValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserTwoFactorAuthVerificationRequest>(
				StatusCodes.BAD_REQUEST,
				message,
				validation.error,
			);
			return res.status(400).json({ message, errors: validation.error.issues });
		}

		const response = await snAuthAPILib.twoFactorAuthVerification({
			email: validation.data.email,
			token: validation.data.token,
			tokenContext: validation.data.tokenContext,
		});

		const message = 'Autenticação em dois fatores validada com sucesso';
		res.locals.response = snResponse<UserTwoFactorAuthVerificationRequest>(StatusCodes.OK, message, null);
		return next();
	} catch (error) {
		next(error);
	}
};
