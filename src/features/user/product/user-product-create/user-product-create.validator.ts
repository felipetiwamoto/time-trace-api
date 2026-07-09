import z from 'zod';
import type { UserProductCreateRequest } from './user-product-create.request.js';

export const userProductCreateValidator: z.ZodType<UserProductCreateRequest> = z.object({
	userAuthID: z.string(),
	name: z.string(),
	description: z.string().optional(),
	price: z.coerce.number(),
	tags: z.array(z.string()),
	categories: z.array(z.string()),
});
