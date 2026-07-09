import type { ProductMenu } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductMenuFindOneRepository = {
	findByID: async (userID: string, id: string): Promise<ProductMenu | null> => {
		try {
			return await prisma.productMenu.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},
};
