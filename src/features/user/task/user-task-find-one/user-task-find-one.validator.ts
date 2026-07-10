import z from 'zod';
import type { UserTaskFindOneRequest } from './user-task-find-one.request.js';

export const userTaskFindOneValidator: z.ZodType<UserTaskFindOneRequest> = z.object({
	userAuthID: z.string(),
	id: z.string(),
});
