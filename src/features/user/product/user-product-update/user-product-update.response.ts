import type { Product } from '@prisma/client';

export type UserProductUpdateResponse = {
	id: string;
};

export const userProductUpdateResponse = (product: Product): UserProductUpdateResponse => ({
	id: product.id,
});
