import type { User as UserModel } from '@prisma/client';
import { TokenContext } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

export const userLoginRepository = {
	findByEmail: async (email: string) => {
		try {
			return await prisma.user.findFirst({ where: { email, deletedAt: null } });
		} catch {
			return null;
		}
	},

	findOrCreateByEmail: async (email: string): Promise<UserModel | null> => {
		try {
			const user = await prisma.user.findFirst({ where: { email, deletedAt: null } });
			if (user) return user;

			return await prisma.user.create({ data: { id: snText.unique(), email } });
		} catch {
			return null;
		}
	},

	update: async (email: string): Promise<UserModel | null> => {
		try {
			return await prisma.user.update({
				where: { email },
				data: {
					token: null,
					tokenContext: null,
					tokenExpiresAt: null,
				},
			});
		} catch {
			return null;
		}
	},
};
