export type UserProductUpdateRequest = {
	id: string;
	userAuthID: string;
	name: string;
	description?: string;
	price: number;
	tags: string[];
	categories: string[];
};
