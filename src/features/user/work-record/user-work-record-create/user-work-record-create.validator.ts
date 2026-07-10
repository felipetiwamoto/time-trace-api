import z from 'zod';
import type { UserWorkRecordCreateRequest } from './user-work-record-create.request.js';

export const userWorkRecordCreateValidator: z.ZodType<UserWorkRecordCreateRequest> = z.object({
	userAuthID: z.string(),
	taskID: z.string(),
	startedAt: z.string().datetime().optional(),
});
