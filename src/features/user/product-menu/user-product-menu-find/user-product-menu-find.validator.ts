import z from 'zod';
import type { UserProductMenuFindRequest } from './user-product-menu-find.request.js';

export const userProductMenuFindValidator: z.ZodType<UserProductMenuFindRequest> = z.object({
	userAuthID: z.string(),
	take: z.number().optional(),
	skip: z.number().optional(),
});
