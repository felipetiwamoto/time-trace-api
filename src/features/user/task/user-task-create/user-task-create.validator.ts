import z from 'zod';
import type { UserTaskCreateRequest } from './user-task-create.request.js';

export const userTaskCreateValidator: z.ZodType<UserTaskCreateRequest> = z.object({
	userAuthID: z.string(),
	projectID: z.string(),
	name: z.string().trim().min(2),
	description: z.string().optional(),
});
