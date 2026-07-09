import z from 'zod';
import type { UserProductTagFindRequest } from './user-product-tag-find.request.js';

export const userProductTagFindValidator: z.ZodType<UserProductTagFindRequest> = z.object({
	userAuthID: z.string(),
	take: z.number().optional(),
	skip: z.number().optional(),
});
