import z from 'zod';
import type { UserProductMenuUpdateRequest } from './user-product-menu-update.request.js';

export const userProductMenuUpdateValidator: z.ZodType<UserProductMenuUpdateRequest> = z.object({
	id: z.string(),
	userAuthID: z.string(),
	name: z.string(),
	isActive: z.boolean(),
});
