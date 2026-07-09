import type { Product, ProductCategory, ProductTag } from '@prisma/client';
import { userProductResponse } from '../user-product.helper.js';

type ProductWithRelations = Product & {
	productTags: Array<{ productTag: ProductTag }>;
	productCategories: Array<{ productCategory: ProductCategory }>;
};

export type UserProductFindOneResponse = ReturnType<typeof userProductResponse>;

export const userProductFindOneResponse = (product: ProductWithRelations): UserProductFindOneResponse =>
	userProductResponse(product);
