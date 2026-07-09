import type { Product } from '@prisma/client';

export type UserProductCreateResponse = {
	id: string;
};

export const userProductCreateResponse = (product: Product): UserProductCreateResponse => ({
	id: product.id,
});
