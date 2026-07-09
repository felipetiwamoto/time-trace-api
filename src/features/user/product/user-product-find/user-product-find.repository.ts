import type { Product, ProductCategory, ProductTag } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

type ProductWithRelations = Product & {
	productTags: Array<{ productTag: ProductTag }>;
	productCategories: Array<{ productCategory: ProductCategory }>;
};

export const userProductFindRepository = {
	find: async (userID: string, take: number, skip: number): Promise<ProductWithRelations[]> => {
		try {
			return (await prisma.product.findMany({
				where: { userID, deletedAt: null },
				orderBy: { createdAt: 'desc' },
				take,
				skip,
				include: {
					productTags: { include: { productTag: true } },
					productCategories: { include: { productCategory: true } },
				},
			})) as ProductWithRelations[];
		} catch {
			return [];
		}
	},
};
