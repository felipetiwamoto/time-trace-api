import z from 'zod';
import type { UserProductCategoryFindRequest } from './user-product-category-find.request.js';

export const userProductCategoryFindValidator: z.ZodType<UserProductCategoryFindRequest> = z.object({
	userAuthID: z.string(),
	take: z.number().optional(),
	skip: z.number().optional(),
});
