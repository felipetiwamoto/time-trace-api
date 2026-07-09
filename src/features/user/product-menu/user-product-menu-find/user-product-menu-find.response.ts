import type { ProductMenu } from '@prisma/client';

export type UserProductMenuFindItemResponse = {
	id: string;
	name: string;
};

export type UserProductMenuFindResponse = UserProductMenuFindItemResponse[];

export const userProductMenuFindResponse = (productCategories: ProductMenu[]): UserProductMenuFindResponse =>
	productCategories.map((productMenu) => ({
		id: productMenu.id,
		name: productMenu.name,
		isActive: productMenu.isActive,
	}));
