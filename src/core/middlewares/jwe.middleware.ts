import type { NextFunction, Request, Response } from 'express';
import { snHash } from '../shared/utils/sn-hash.helper.js';

const isRecord = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const shouldUseJWE = () => process.env.USE_JWE === '1';

export const jweMiddleware = {
	decode: (
		req: Request<unknown, unknown, { payload?: string } & Record<string, unknown>>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			void res;

			if (!shouldUseJWE()) return next();

			const encrypted = req.body?.payload;

			if (typeof encrypted !== 'string' || encrypted.length === 0) {
				return res.status(400).json({
					statusCode: 400,
					message: 'Encrypted payload is required',
				});
			}

			const decoded = snHash.decode(encrypted);
			const parsed: unknown = JSON.parse(decoded);

			if (!isRecord(parsed)) throw new Error('Invalid JWE payload.');

			req.body = parsed as { data?: string } & Record<string, unknown>;

			return next();
		} catch (error) {
			return next(error);
		}
	},

	encode: (req: Request, res: Response, next: NextFunction) => {
		try {
			void req;

			if (!shouldUseJWE()) {
				return res.status(res.locals.response.statusCode).json(res.locals.response);
			}

			const encrypted = snHash.encode(res.locals.response);

			return res.status(res.locals.response.statusCode).json({ data: encrypted });
		} catch (error) {
			return next(error);
		}
	},
};
