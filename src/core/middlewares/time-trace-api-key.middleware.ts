import type { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases as StatusMessage } from 'http-status-codes';

export const timeTraceAPIKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
	// if (req.method === 'OPTIONS') {
	// 	return next();
	// }

	const timeTraceAPIKeyHeader = req.headers['x-time-trace-api-key'];
	const timeTraceAPIKey = Array.isArray(timeTraceAPIKeyHeader) ? timeTraceAPIKeyHeader[0] : timeTraceAPIKeyHeader;

	if (!timeTraceAPIKey || timeTraceAPIKey !== process.env.TIME_TRACE_API_API_KEY) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ message: StatusMessage.UNAUTHORIZED });
	}

	return next();
};
