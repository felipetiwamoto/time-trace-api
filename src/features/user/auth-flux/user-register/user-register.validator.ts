import z from 'zod';
import type { UserRegisterRequest } from './user-register.request.js';

export const userRegisterValidator: z.ZodType<UserRegisterRequest> = z
	.object({
		name: z.string().min(2).max(255),
		email: z.string().email(),
		password: z.string().min(8).max(255),
		confirmPassword: z.string().min(8).max(255),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});
