import z from 'zod';
import type { UserProjectDeleteRequest } from './user-project-delete.request.js';

export const userProjectDeleteValidator: z.ZodType<UserProjectDeleteRequest> = z.object({
	userAuthID: z.string(),
	ids: z.array(z.string()).min(1),
});
