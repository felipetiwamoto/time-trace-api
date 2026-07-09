import type { ProductMenu } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductMenuUpdateRepository = {
	findByID: async (userID: string, id: string) => {
		try {
			return await prisma.productMenu.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},
	findByName: async (userID: string, name: string, id: string) => {
		try {
			return await prisma.productMenu.findFirst({ where: { userID, name, deletedAt: null, id: { not: id } } });
		} catch {
			return null;
		}
	},
	update: async (id: string, userID: string, name: string, isActive: boolean): Promise<ProductMenu | null> => {
		try {
			if (isActive)
				await prisma.productMenu.updateMany({
					where: { userID },
					data: { isActive: false },
				});
			return await prisma.productMenu.update({ where: { id, userID }, data: { name, isActive } });
		} catch {
			return null;
		}
	},
};
