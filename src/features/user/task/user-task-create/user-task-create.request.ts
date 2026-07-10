export type UserTaskCreateRequest = {
	userAuthID: string;
	projectID: string;
	name: string;
	description?: string;
};
