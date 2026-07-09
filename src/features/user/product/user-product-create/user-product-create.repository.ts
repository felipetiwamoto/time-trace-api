import type { Product } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';
import type { UserProductCreateRequest } from './user-product-create.request.js';

export const userProductCreateRepository = {
	findByName: async (userID: string, name: string) => {
		try {
			return await prisma.product.findFirst({ where: { userID, name, deletedAt: null } });
		} catch {
			return null;
		}
	},
	create: async ({
		userAuthID,
		name,
		description,
		price,
		tags,
		categories,
	}: UserProductCreateRequest): Promise<Product | null> => {
		try {
			const productID = snText.unique();
			const createdProduct = await prisma.product.create({
				data: {
					id: productID,
					userID: userAuthID,
					name,
					description: description || null,
					price,
					image: null,
				},
			});

			if (tags.length) {
				await prisma.productTagOnProduct.createMany({
					data: tags.map((productTagID) => ({
						id: snText.unique(),
						userID: userAuthID,
						productID,
						productTagID,
					})),
				});
			}

			if (categories.length) {
				await prisma.productCategoryOnProduct.createMany({
					data: categories.map((productCategoryID) => ({
						id: snText.unique(),
						userID: userAuthID,
						productID,
						productCategoryID,
					})),
				});
			}
			return createdProduct;
		} catch {
			return null;
		}
	},
};
