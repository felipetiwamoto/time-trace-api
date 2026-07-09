import z from 'zod';
import type { UserProductTagCreateRequest } from './user-product-tag-create.request.js';

export const userProductTagValidator: z.ZodType<UserProductTagCreateRequest> = z.object({
	userAuthID: z.string(),
	name: z.string(),
});
