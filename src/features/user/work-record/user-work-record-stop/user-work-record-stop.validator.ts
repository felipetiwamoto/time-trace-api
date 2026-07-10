import z from 'zod';
import type { UserWorkRecordStopRequest } from './user-work-record-stop.request.js';

export const userWorkRecordStopValidator: z.ZodType<UserWorkRecordStopRequest> = z.object({
	userAuthID: z.string(),
	id: z.string(),
	stoppedAt: z.string().datetime().optional(),
});
