import type { ProductCategory } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductCategoryFindRepository = {
	find: async (userID: string, take: number, skip: number): Promise<ProductCategory[]> => {
		try {
			return await prisma.productCategory.findMany({
				where: { userID, deletedAt: null },
				orderBy: { createdAt: 'desc' },
				take,
				skip,
			});
		} catch {
			return [];
		}
	},
};
