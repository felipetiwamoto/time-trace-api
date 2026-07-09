import type { Product } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';
import type { UserProductUpdateRequest } from './user-product-update.request.js';

export const userProductUpdateRepository = {
	findByID: async (userID: string, id: string) => {
		try {
			return await prisma.product.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},
	findByName: async (userID: string, name: string, id: string) => {
		try {
			return await prisma.product.findFirst({ where: { userID, name, deletedAt: null, id: { not: id } } });
		} catch {
			return null;
		}
	},
	update: async ({
		id,
		userAuthID,
		name,
		description,
		price,
		tags,
		categories,
	}: UserProductUpdateRequest): Promise<Product | null> => {
		try {
			const updatedProduct = await prisma.product.update({
				where: { id, userID: userAuthID },
				data: {
					name,
					description: description || null,
					price,
				},
			});

			await prisma.productTagOnProduct.deleteMany({ where: { productID: id, userID: userAuthID } });
			if (tags.length) {
				await prisma.productTagOnProduct.createMany({
					data: tags.map((productTagID) => ({
						id: snText.unique(),
						userID: userAuthID,
						productID: id,
						productTagID,
					})),
				});
			}

			await prisma.productCategoryOnProduct.deleteMany({ where: { productID: id, userID: userAuthID } });
			if (categories.length) {
				await prisma.productCategoryOnProduct.createMany({
					data: categories.map((productCategoryID) => ({
						id: snText.unique(),
						userID: userAuthID,
						productID: id,
						productCategoryID,
					})),
				});
			}

			return updatedProduct;
		} catch {
			return null;
		}
	},
};
