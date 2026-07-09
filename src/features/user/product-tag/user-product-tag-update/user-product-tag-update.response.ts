import type { ProductTag } from '@prisma/client';

export type UserProductTagUpdateResponse = {
	id: string;
	name: string;
};

export const userProductTagUpdateResponse = (productTag: ProductTag): UserProductTagUpdateResponse => ({
	id: productTag.id,
	name: productTag.name,
});
