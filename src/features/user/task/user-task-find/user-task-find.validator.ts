import z from 'zod';
import type { UserTaskFindRequest } from './user-task-find.request.js';

export const userTaskFindValidator: z.ZodType<UserTaskFindRequest> = z.object({
	userAuthID: z.string(),
	projectID: z.string().optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
});
