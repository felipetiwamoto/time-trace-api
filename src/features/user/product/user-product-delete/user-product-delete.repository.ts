import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductDeleteRepository = {
	deleteMany: async (userID: string, ids: string[]) => {
		try {
			return await prisma.product.deleteMany({ where: { userID, id: { in: ids } } });
		} catch {
			return null;
		}
	},
};
