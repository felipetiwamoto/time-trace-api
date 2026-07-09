import type { ProductMenu } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductMenuFindRepository = {
	find: async (userID: string, take: number, skip: number): Promise<ProductMenu[]> => {
		try {
			return await prisma.productMenu.findMany({
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
