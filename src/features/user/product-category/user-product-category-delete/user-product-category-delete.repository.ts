import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductCategoryDeleteRepository = {
	deleteMany: async (userID: string, ids: string[]) => {
		try {
			return await prisma.productCategory.deleteMany({ where: { userID, id: { in: ids } } });
		} catch {
			return null;
		}
	},
};
