import z from 'zod';
import type { UserProductCategoryUpdateRequest } from './user-product-category-update.request.js';

export const userProductCategoryUpdateValidator: z.ZodType<UserProductCategoryUpdateRequest> = z.object({
	id: z.string(),
	userAuthID: z.string(),
	name: z.string(),
});
