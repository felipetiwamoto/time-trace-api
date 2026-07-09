import type { TokenContext } from '@prisma/client';

export type UserTwoFactorAuthVerificationRequest = {
	email: string;
	token: string;
	tokenContext: TokenContext;
};
