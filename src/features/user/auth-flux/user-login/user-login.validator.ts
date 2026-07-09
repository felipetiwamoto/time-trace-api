import z from 'zod';
import type { UserLoginRequest } from './user-login.request.js';

export const userLoginValidator: z.ZodType<UserLoginRequest> = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(255),
});
