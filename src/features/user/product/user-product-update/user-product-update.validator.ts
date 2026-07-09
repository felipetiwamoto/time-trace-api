import z from 'zod';
import type { UserProductUpdateRequest } from './user-product-update.request.js';

export const userProductUpdateValidator: z.ZodType<UserProductUpdateRequest> = z.object({
	id: z.string(),
	userAuthID: z.string(),
	name: z.string(),
	description: z.string().optional(),
	price: z.coerce.number(),
	tags: z.array(z.string()),
	categories: z.array(z.string()),
});
