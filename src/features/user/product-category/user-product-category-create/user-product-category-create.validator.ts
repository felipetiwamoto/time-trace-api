import z from 'zod';
import type { UserproductCategoryCreateRequest } from './user-product-category-create.request.js';

export const userProductCategoryCreateValidator: z.ZodType<UserproductCategoryCreateRequest> = z.object({
	userAuthID: z.string(),
	name: z.string(),
});
