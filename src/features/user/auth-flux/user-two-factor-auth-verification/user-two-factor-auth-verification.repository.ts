import { prisma } from '../../../../core/libs/prisma.lib.js';
import { TokenContext } from '@prisma/client';
import { snDate } from '../../../../core/shared/utils/sn-date.helper.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';
import { id } from 'zod/locales';

export const userTwoFactorAuthVerificationRepository = {
	findByEmailAndToken: async (email: string, token: string) => {
		try {
			return await prisma.user.findFirst({
				where: { email, token, deletedAt: null },
			});
		} catch {
			return null;
		}
	},
	update: async (email: string, token: string, tokenContext: TokenContext) => {
		try {
			const user = await prisma.user.findFirst({
				where: { email, token, deletedAt: null },
				select: { emailValidatedAt: true },
			});
			return await prisma.user.updateMany({
				where: { email, token, deletedAt: null },
				data: {
					tokenContext,
					tokenExpiresAt: snDate.modify(new Date(), 2, 'minutes'),
					emailValidatedAt: user?.emailValidatedAt ?? new Date(),
				},
			});
		} catch {
			return null;
		}
	},
};
