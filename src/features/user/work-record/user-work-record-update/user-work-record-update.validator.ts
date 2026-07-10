import z from 'zod';
import type { UserWorkRecordUpdateRequest } from './user-work-record-update.request.js';

export const userWorkRecordUpdateValidator: z.ZodType<UserWorkRecordUpdateRequest> = z
	.object({
		userAuthID: z.string(),
		id: z.string(),
		startedAt: z.string().datetime(),
		stoppedAt: z.string().datetime(),
	})
	.refine((value) => new Date(value.stoppedAt) >= new Date(value.startedAt), {
		message: 'O fim deve ser posterior ao início',
		path: ['stoppedAt'],
	});
