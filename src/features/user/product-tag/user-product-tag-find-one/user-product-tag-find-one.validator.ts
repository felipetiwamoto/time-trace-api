import z from 'zod';
import type { UserProductTagFindOneRequest } from './user-product-tag-find-one.request.js';

export const userProductTagFindOneValidator: z.ZodType<UserProductTagFindOneRequest> = z.object({
	id: z.string(),
	userAuthID: z.string(),
});
