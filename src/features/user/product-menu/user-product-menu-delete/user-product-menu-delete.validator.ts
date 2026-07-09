import z from 'zod';
import type { UserProductMenuDeleteRequest } from './user-product-menu-delete.request.js';

export const userProductMenuDeleteValidator: z.ZodType<UserProductMenuDeleteRequest> = z.object({
	ids: z.array(z.string()).min(1),
	userAuthID: z.string(),
});
