import z from 'zod';
import type { UserWorkRecordFindRequest } from './user-work-record-find.request.js';

export const userWorkRecordFindValidator: z.ZodType<UserWorkRecordFindRequest> = z.object({
	userAuthID: z.string(),
	taskID: z.string().optional(),
	startedAtFrom: z.string().datetime().optional(),
	startedAtTo: z.string().datetime().optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
});
