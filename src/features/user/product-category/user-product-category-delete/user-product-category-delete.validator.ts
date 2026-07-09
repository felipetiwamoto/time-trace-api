import z from 'zod';
import type { UserProductCategoryDeleteRequest } from './user-product-category-delete.request.js';

export const userProductCategoryDeleteValidator: z.ZodType<UserProductCategoryDeleteRequest> = z.object({
	ids: z.array(z.string()).min(1),
	userAuthID: z.string(),
});
