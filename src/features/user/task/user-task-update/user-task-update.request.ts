export type UserTaskUpdateRequest = {
	userAuthID: string;
	id: string;
	projectID: string;
	name: string;
	description?: string;
};
