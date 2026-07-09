import type { ProductTag } from '@prisma/client';

export type UserProductTagFindItemResponse = {
	id: string;
	name: string;
};

export type UserProductTagFindResponse = UserProductTagFindItemResponse[];

export const userProductTagFindResponse = (productTags: ProductTag[]): UserProductTagFindResponse =>
	productTags.map((productTag) => ({
		id: productTag.id,
		name: productTag.name,
	}));
