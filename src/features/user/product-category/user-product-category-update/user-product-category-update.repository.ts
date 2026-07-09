import type { ProductCategory } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductCategoryUpdateRepository = {
	findByID: async (userID: string, id: string) => {
		try {
			return await prisma.productCategory.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},
	findByName: async (userID: string, name: string, id: string) => {
		try {
			return await prisma.productCategory.findFirst({
				where: { userID, name, deletedAt: null, id: { not: id } },
			});
		} catch {
			return null;
		}
	},
	update: async (id: string, name: string): Promise<ProductCategory | null> => {
		try {
			return await prisma.productCategory.update({ where: { id }, data: { name } });
		} catch {
			return null;
		}
	},
};
