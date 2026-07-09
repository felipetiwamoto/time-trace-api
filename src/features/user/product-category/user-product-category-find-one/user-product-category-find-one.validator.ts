import z from 'zod';
import type { UserProductCategoryFindOneRequest } from './user-product-category-find-one.request.js';

export const userProductCategoryFindOneValidator: z.ZodType<UserProductCategoryFindOneRequest> = z.object({
	id: z.string(),
	userAuthID: z.string(),
});
