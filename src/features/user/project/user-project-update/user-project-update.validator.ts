import z from 'zod';
import type { UserProjectUpdateRequest } from './user-project-update.request.js';

export const userProjectUpdateValidator: z.ZodType<UserProjectUpdateRequest> = z.object({
	userAuthID: z.string(),
	id: z.string(),
	name: z.string().trim().min(2),
});
