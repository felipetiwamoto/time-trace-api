import z from 'zod';
import type { UserWorkRecordStopAllRequest } from './user-work-record-stop-all.request.js';

export const userWorkRecordStopAllValidator: z.ZodType<UserWorkRecordStopAllRequest> = z.object({
	userAuthID: z.string(),
	stoppedAt: z.string().datetime().optional(),
});
