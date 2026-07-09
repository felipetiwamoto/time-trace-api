import type { Product, ProductCategory, ProductTag } from '@prisma/client';
import { userProductsResponse } from '../user-product.helper.js';

type ProductWithRelations = Product & {
	productTags: Array<{ productTag: ProductTag }>;
	productCategories: Array<{ productCategory: ProductCategory }>;
};

export type UserProductFindResponse = ReturnType<typeof userProductsResponse>;

export const userProductFindResponse = (products: ProductWithRelations[]): UserProductFindResponse =>
	userProductsResponse(products);
