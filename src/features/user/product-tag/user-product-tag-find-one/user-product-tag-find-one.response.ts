import type { ProductTag } from '@prisma/client';

export type UserProductTagFindOneResponse = {
	id: string;
	name: string;
};

export const userProductTagFindOneResponse = (productTag: ProductTag): UserProductTagFindOneResponse => ({
	id: productTag.id,
	name: productTag.name,
});
