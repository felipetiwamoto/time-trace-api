import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductTagDeleteRepository = {
	deleteMany: async (userID: string, ids: string[]) => {
		try {
			return await prisma.productTag.deleteMany({ where: { userID, id: { in: ids } } });
		} catch {
			return null;
		}
	},
};
