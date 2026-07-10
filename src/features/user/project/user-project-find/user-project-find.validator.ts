import z from 'zod';
import type { UserProjectFindRequest } from './user-project-find.request.js';

export const userProjectFindValidator: z.ZodType<UserProjectFindRequest> = z.object({
	userAuthID: z.string(),
	take: z.number().optional(),
	skip: z.number().optional(),
});
