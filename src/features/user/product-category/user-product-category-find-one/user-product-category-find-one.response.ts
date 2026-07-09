import type { ProductCategory } from '@prisma/client';

export type UserProductCategoryFindOneResponse = {
	id: string;
	name: string;
};

export const userProductCategoryFindOneResponse = (
	productCategory: ProductCategory,
): UserProductCategoryFindOneResponse => ({
	id: productCategory.id,
	name: productCategory.name,
});
