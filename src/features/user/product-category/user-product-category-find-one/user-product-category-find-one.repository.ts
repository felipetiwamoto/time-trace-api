import type { ProductCategory } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductCategoryFindOneRepository = {
	findByID: async (userID: string, id: string): Promise<ProductCategory | null> => {
		try {
			return await prisma.productCategory.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},
};
