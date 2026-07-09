import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

export const userRegisterRepository = {
	create: async ({ email }: { email: string }) => {
		try {
			return await prisma.user.create({ data: { id: snText.unique(), email } });
		} catch {
			return null;
		}
	},
};
