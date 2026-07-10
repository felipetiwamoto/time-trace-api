import z from 'zod';
import type { UserProjectCreateRequest } from './user-project-create.request.js';

export const userProjectCreateValidator: z.ZodType<UserProjectCreateRequest> = z.object({
	userAuthID: z.string(),
	name: z.string().trim().min(2),
});
