import type { ProductCategory } from '@prisma/client';

export type UserProductCategoryUpdateResponse = {
	id: string;
	name: string;
};

export const userProductCategoryUpdateResponse = (
	productCategory: ProductCategory,
): UserProductCategoryUpdateResponse => ({
	id: productCategory.id,
	name: productCategory.name,
});
