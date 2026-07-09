import z from 'zod';
import type { UserProductFindRequest } from './user-product-find.request.js';

export const userProductFindValidator: z.ZodType<UserProductFindRequest> = z.object({
	userAuthID: z.string(),
	take: z.number().optional(),
	skip: z.number().optional(),
});
