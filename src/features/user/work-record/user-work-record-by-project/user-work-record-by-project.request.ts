export type UserWorkRecordByProjectRequest = {
	userAuthID: string;
	startedAtFrom?: string;
	startedAtTo?: string;
	take?: number;
	skip?: number;
};
