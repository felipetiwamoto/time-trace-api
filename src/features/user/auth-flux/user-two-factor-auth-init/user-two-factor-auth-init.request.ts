import type { TokenContext } from '@prisma/client';

export type UserTwoFactorAuthInitRequest = {
	email: string;
	tokenContext: TokenContext;
};
