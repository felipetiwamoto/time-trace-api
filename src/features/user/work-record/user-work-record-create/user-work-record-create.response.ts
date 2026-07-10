import type { Project, Task, WorkRecord } from '@prisma/client';

type WorkRecordWithTask = WorkRecord & { task: Task & { project: Project } };

export type UserWorkRecordCreateResponse = {
	id: string;
	taskID: string;
	startedAt: string;
	stoppedAt: string | null;
	task: {
		id: string;
		projectID: string;
		name: string;
		description: string;
		project: { id: string; name: string };
	};
};

export const userWorkRecordCreateResponse = (workRecord: WorkRecordWithTask): UserWorkRecordCreateResponse => ({
	id: workRecord.id,
	taskID: workRecord.taskID,
	startedAt: workRecord.startedAt.toISOString(),
	stoppedAt: workRecord.stoppedAt?.toISOString() ?? null,
	task: {
		id: workRecord.task.id,
		projectID: workRecord.task.projectID,
		name: workRecord.task.name,
		description: workRecord.task.description ?? '',
		project: {
			id: workRecord.task.project.id,
			name: workRecord.task.project.name,
		},
	},
});
