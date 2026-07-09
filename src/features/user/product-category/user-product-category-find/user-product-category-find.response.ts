import type { ProductCategory } from '@prisma/client';

export type UserProductCategoryFindItemResponse = {
	id: string;
	name: string;
};

export type UserProductCategoryFindResponse = UserProductCategoryFindItemResponse[];

export const userProductCategoryFindResponse = (
	productCategories: ProductCategory[],
): UserProductCategoryFindResponse =>
	productCategories.map((productCategory) => ({
		id: productCategory.id,
		name: productCategory.name,
	}));
