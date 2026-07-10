import z from 'zod';
import type { UserTaskDeleteRequest } from './user-task-delete.request.js';

export const userTaskDeleteValidator: z.ZodType<UserTaskDeleteRequest> = z.object({
	userAuthID: z.string(),
	ids: z.array(z.string()).min(1),
});
