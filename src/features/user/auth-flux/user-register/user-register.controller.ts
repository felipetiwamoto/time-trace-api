import bcrypt from 'bcrypt';
import type { NextFunction, Request, Response } from 'express';
import { ReasonPhrases as StatusMessage, StatusCodes } from 'http-status-codes';
import { snResponse } from '../../../../core/shared/utils/sn-response.helper.js';
import { userRegisterRepository } from './user-register.repository.js';
import type { UserRegisterRequest } from './user-register.request.js';
import { userRegisterResponse } from './user-register.response.js';
import { userRegisterValidator } from './user-register.validator.js';
import { snAuthAPILib } from '../../../../core/libs/sn-auth-api.lib.js';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

export const userRegisterController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as UserRegisterRequest;

		const validation = userRegisterValidator.safeParse(body);
		if (!validation.success) {
			const message = 'Corpo da requisição inválido';
			res.locals.response = snResponse<UserRegisterRequest>(StatusCodes.BAD_REQUEST, message, validation.error);
			return next();
		}

		const response = await snAuthAPILib.register({
			name: validation.data.name,
			email: validation.data.email,
			password: validation.data.password,
			confirmPassword: validation.data.confirmPassword,
		});

		const storedUser = await userRegisterRepository.create({ email: response.data.payload.email });

		if (!storedUser) {
			const message = 'Erro interno do servidor';
			res.locals.response = snResponse<UserRegisterRequest>(StatusCodes.INTERNAL_SERVER_ERROR, message, null);
			return next();
		}

		const message = 'Estabelecimento cadastrado com sucesso';
		res.locals.response = {
			...snResponse<UserRegisterRequest>(StatusCodes.CREATED, message, null),
			payload: userRegisterResponse({
				id: String(storedUser?.id),
				name: response.data.payload.name,
				email: response.data.payload.email,
			}),
		};
		return next();
	} catch (error) {
		return next(error);
	}
};
