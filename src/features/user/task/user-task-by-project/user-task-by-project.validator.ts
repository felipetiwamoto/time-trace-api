import z from 'zod';
import type { UserTaskByProjectRequest } from './user-task-by-project.request.js';

export const userTaskByProjectValidator: z.ZodType<UserTaskByProjectRequest> = z.object({
	userAuthID: z.string(),
	take: z.number().optional(),
	skip: z.number().optional(),
});
