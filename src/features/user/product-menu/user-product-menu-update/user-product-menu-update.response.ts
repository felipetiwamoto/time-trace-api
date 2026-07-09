import type { ProductMenu } from '@prisma/client';

export type UserProductMenuUpdateResponse = {
	id: string;
	name: string;
};

export const userProductMenuUpdateResponse = (productMenu: ProductMenu): UserProductMenuUpdateResponse => ({
	id: productMenu.id,
	name: productMenu.name,
});
