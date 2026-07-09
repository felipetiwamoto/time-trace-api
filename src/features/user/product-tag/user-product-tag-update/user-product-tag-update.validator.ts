import z from 'zod';
import type { UserProductTagUpdateRequest } from './user-product-tag-update.request.js';

export const userProductTagUpdateValidator: z.ZodType<UserProductTagUpdateRequest> = z.object({
	id: z.string(),
	userAuthID: z.string(),
	name: z.string(),
});
