import type { ProductTag } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductTagFindOneRepository = {
	findByID: async (userID: string, id: string): Promise<ProductTag | null> => {
		try {
			return await prisma.productTag.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},
};
