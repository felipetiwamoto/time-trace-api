import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductMenuDeleteRepository = {
	deleteMany: async (userID: string, ids: string[]) => {
		try {
			return await prisma.productMenu.deleteMany({ where: { userID, id: { in: ids } } });
		} catch {
			return null;
		}
	},
};
