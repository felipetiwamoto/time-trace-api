import z from 'zod';
import type { UserProductFindOneRequest } from './user-product-find-one.request.js';

export const userProductFindOneValidator: z.ZodType<UserProductFindOneRequest> = z.object({
	id: z.string(),
	userAuthID: z.string(),
});
