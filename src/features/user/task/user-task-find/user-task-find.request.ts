export type UserTaskFindRequest = {
	userAuthID: string;
	projectID?: string;
	take?: number;
	skip?: number;
};
