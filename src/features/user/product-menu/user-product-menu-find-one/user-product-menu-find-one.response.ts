import type { ProductMenu } from '@prisma/client';

export type UserProductMenuFindOneResponse = {
	id: string;
	name: string;
};

export const userProductMenuFindOneResponse = (productMenu: ProductMenu): UserProductMenuFindOneResponse => ({
	id: productMenu.id,
	name: productMenu.name,
});
