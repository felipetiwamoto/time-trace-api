import type { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases as StatusMessage } from 'http-status-codes';
import { prisma } from '../../core/libs/prisma.lib.js';

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const userAuthIDHeader = req.headers['x-user-auth-id'];

	const userAuthID = Array.isArray(userAuthIDHeader) ? userAuthIDHeader[0] : userAuthIDHeader;
	if (!userAuthID) return res.status(StatusCodes.UNAUTHORIZED).json({ message: StatusMessage.UNAUTHORIZED });

	const user = await prisma.user.findFirst({ where: { id: userAuthID, deletedAt: null } });
	if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: StatusMessage.UNAUTHORIZED });
	req.body = {
		...(typeof req.body === 'object' && req.body !== null ? req.body : {}),
		userAuthID,
	};

	return next();
};
