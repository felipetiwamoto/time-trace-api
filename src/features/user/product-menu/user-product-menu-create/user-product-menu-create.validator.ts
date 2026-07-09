import z from 'zod';
import type { UserProductMenuCreateRequest } from './user-product-menu-create.request.js';

export const userProductMenuValidator: z.ZodType<UserProductMenuCreateRequest> = z.object({
	userAuthID: z.string(),
	name: z.string(),
	isActive: z.boolean(),
});
