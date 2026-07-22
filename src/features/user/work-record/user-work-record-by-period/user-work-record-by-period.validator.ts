import z from 'zod';
import type { UserWorkRecordByPeriodRequest } from './user-work-record-by-period.request.js';

export const userWorkRecordByPeriodValidator: z.ZodType<UserWorkRecordByPeriodRequest> = z.object({
	userAuthID: z.string(),
	from: z.string().datetime(),
	to: z.string().datetime(),
});
