import type { ProductCategory } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

export const userProductCategoryCreateRepository = {
	findByName: async (userID: string, name: string) => {
		try {
			return await prisma.productCategory.findFirst({ where: { userID, name } });
		} catch {
			return null;
		}
	},
	create: async (userID: string, name: string): Promise<ProductCategory | null> => {
		try {
			return await prisma.productCategory.create({ data: { id: snText.unique(), userID, name } });
		} catch {
			return null;
		}
	},
};
