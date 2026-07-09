import type { ProductTag } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProductTagUpdateRepository = {
	findByID: async (userID: string, id: string) => {
		try {
			return await prisma.productTag.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},
	findByName: async (userID: string, name: string, id: string) => {
		try {
			return await prisma.productTag.findFirst({ where: { userID, name, deletedAt: null, id: { not: id } } });
		} catch {
			return null;
		}
	},
	update: async (id: string, name: string): Promise<ProductTag | null> => {
		try {
			return await prisma.productTag.update({ where: { id }, data: { name } });
		} catch {
			return null;
		}
	},
};
