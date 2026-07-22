import z from 'zod';
import type { UserWorkRecordByProjectRequest } from './user-work-record-by-project.request.js';

export const userWorkRecordByProjectValidator: z.ZodType<UserWorkRecordByProjectRequest> = z.object({
	userAuthID: z.string(),
	startedAtFrom: z.string().optional(),
	startedAtTo: z.string().optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
});
