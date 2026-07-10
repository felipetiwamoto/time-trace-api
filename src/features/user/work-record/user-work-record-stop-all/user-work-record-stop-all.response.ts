export type UserWorkRecordStopAllResponse = {
	count: number;
};

export const userWorkRecordStopAllResponse = (count: number): UserWorkRecordStopAllResponse => ({ count });
