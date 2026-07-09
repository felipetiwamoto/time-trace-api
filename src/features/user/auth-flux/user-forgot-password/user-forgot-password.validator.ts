import z from 'zod';
import type { UserForgotPasswordRequest } from './user-forgot-password.request.js';

export const userForgotPasswordValidator: z.ZodType<UserForgotPasswordRequest> = z
	.object({
		email: z.string().email(),
		newPassword: z.string().min(8).max(255),
		confirmNewPassword: z.string().min(8).max(255),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Passwords do not match',
		path: ['confirmNewPassword'],
	});
