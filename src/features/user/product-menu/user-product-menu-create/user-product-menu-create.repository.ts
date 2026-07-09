import type { ProductMenu } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

export const userProductMenuRepository = {
	findByName: async (userID: string, name: string) => {
		try {
			return await prisma.productMenu.findFirst({ where: { userID, name } });
		} catch {
			return null;
		}
	},
	create: async (userID: string, name: string, isActive: boolean): Promise<ProductMenu | null> => {
		try {
			if (isActive)
				await prisma.productMenu.updateMany({
					where: { userID },
					data: { isActive: false },
				});
			return await prisma.productMenu.create({ data: { id: snText.unique(), userID, name, isActive } });
		} catch {
			return null;
		}
	},
};
