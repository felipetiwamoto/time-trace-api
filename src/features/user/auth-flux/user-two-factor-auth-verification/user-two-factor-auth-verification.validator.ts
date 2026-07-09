import z from 'zod';
import type { UserTwoFactorAuthVerificationRequest } from './user-two-factor-auth-verification.request.js';
import { TokenContext } from '@prisma/client';

export const userTwoFactorAuthVerificationValidator: z.ZodType<UserTwoFactorAuthVerificationRequest> = z.object({
	email: z.string().email(),
	token: z.string().min(6).max(6),
	tokenContext: z.enum([
		TokenContext.REGISTER,
		TokenContext.LOGIN,
		TokenContext.FORGOT_PASSWORD,
		TokenContext.GENERATE_API_KEY,
	]),
});
