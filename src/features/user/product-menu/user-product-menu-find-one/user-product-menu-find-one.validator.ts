import z from 'zod';
import type { UserProductMenuFindOneRequest } from './user-product-menu-find-one.request.js';

export const userProductMenuFindOneValidator: z.ZodType<UserProductMenuFindOneRequest> = z.object({
	id: z.string(),
	userAuthID: z.string(),
});
