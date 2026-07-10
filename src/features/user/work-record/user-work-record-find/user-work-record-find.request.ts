export type UserWorkRecordFindRequest = {
	userAuthID: string;
	taskID?: string;
	startedAtFrom?: string;
	startedAtTo?: string;
	take?: number;
	skip?: number;
};
