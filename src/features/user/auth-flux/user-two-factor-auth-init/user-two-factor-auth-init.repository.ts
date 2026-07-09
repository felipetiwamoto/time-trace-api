import { prisma } from '../../../../core/libs/prisma.lib.js';
import { TokenContext } from '@prisma/client';
import { snDate } from '../../../../core/shared/utils/sn-date.helper.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

export const userTwoFactorAuthInitRepository = {
	findByEmail: async (email: string) => {
		try {
			return await prisma.user.findFirst({ where: { email, deletedAt: null } });
		} catch {
			return null;
		}
	},
};
