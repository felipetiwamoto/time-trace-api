import z from 'zod';
import type { UserTwoFactorAuthInitRequest } from './user-two-factor-auth-init.request.js';
import { TokenContext } from '@prisma/client';

export const userTwoFactorAuthInitValidator: z.ZodType<UserTwoFactorAuthInitRequest> = z.object({
	email: z.string().email(),
	tokenContext: z.enum([TokenContext.REGISTER, TokenContext.LOGIN, TokenContext.FORGOT_PASSWORD]),
});
