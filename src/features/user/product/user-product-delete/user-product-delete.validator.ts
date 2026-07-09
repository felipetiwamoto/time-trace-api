import z from 'zod';
import type { UserProductDeleteRequest } from './user-product-delete.request.js';

export const userProductDeleteValidator: z.ZodType<UserProductDeleteRequest> = z.object({
	ids: z.array(z.string()).min(1),
	userAuthID: z.string(),
});
