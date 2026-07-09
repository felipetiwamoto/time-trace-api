export type UserProductCreateRequest = {
	userAuthID: string;
	name: string;
	description: string;
	price: number;
	tags: string[];
	categories: string[];
};
