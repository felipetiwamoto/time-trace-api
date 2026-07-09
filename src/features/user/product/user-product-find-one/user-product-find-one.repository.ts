import type { Product, ProductCategory, ProductTag } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

type ProductWithRelations = Product & {
	productTags: Array<{ productTag: ProductTag }>;
	productCategories: Array<{ productCategory: ProductCategory }>;
};

export const userProductFindOneRepository = {
	findByID: async (userID: string, id: string): Promise<ProductWithRelations | null> => {
		try {
			return (await prisma.product.findFirst({
				where: { id, userID, deletedAt: null },
				include: {
					productTags: { include: { productTag: true } },
					productCategories: { include: { productCategory: true } },
				},
			})) as ProductWithRelations | null;
		} catch {
			return null;
		}
	},
};
