import type { ProductTag } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

export const userProductTagRepository = {
	findByName: async (userID: string, name: string) => {
		try {
			return await prisma.productTag.findFirst({ where: { userID, name } });
		} catch {
			return null;
		}
	},
	create: async (userID: string, name: string): Promise<ProductTag | null> => {
		try {
			return await prisma.productTag.create({ data: { id: snText.unique(), userID, name } });
		} catch {
			return null;
		}
	},
};
