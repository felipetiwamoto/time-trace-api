import z from 'zod';
import type { UserTaskUpdateRequest } from './user-task-update.request.js';

export const userTaskUpdateValidator: z.ZodType<UserTaskUpdateRequest> = z.object({
	userAuthID: z.string(),
	id: z.string(),
	projectID: z.string(),
	name: z.string().trim().min(2),
	description: z.string().optional(),
});
