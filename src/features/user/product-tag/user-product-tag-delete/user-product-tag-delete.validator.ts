import z from 'zod';
import type { UserProductTagDeleteRequest } from './user-product-tag-delete.request.js';

export const userProductTagDeleteValidator: z.ZodType<UserProductTagDeleteRequest> = z.object({
	ids: z.array(z.string()).min(1),
	userAuthID: z.string(),
});
