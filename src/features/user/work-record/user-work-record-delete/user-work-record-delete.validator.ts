import z from 'zod';
import type { UserWorkRecordDeleteRequest } from './user-work-record-delete.request.js';

export const userWorkRecordDeleteValidator: z.ZodType<UserWorkRecordDeleteRequest> = z.object({
	userAuthID: z.string(),
	ids: z.array(z.string()).min(1),
});
