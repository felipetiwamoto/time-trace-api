import type { ProductTag } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductTagFindRepository = {
	find: async (userID: string, take: number, skip: number): Promise<ProductTag[]> => {
		try {
			return await prisma.productTag.findMany({
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
