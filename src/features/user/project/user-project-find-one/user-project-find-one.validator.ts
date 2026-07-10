import z from 'zod';
import type { UserProjectFindOneRequest } from './user-project-find-one.request.js';

export const userProjectFindOneValidator: z.ZodType<UserProjectFindOneRequest> = z.object({
	userAuthID: z.string(),
	id: z.string(),
});
