import type { Project, Task } from '@prisma/client';

type TaskWithProject = Task & { project: Project };

export type UserTaskFindOneResponse = {
	id: string;
	projectID: string;
	name: string;
	description: string;
	project: {
		id: string;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
};

export const userTaskFindOneResponse = (task: TaskWithProject): UserTaskFindOneResponse => ({
	id: task.id,
	projectID: task.projectID,
	name: task.name,
	description: task.description ?? '',
	project: {
		id: task.project.id,
		name: task.project.name,
	},
	createdAt: task.createdAt.toISOString(),
	updatedAt: task.updatedAt.toISOString(),
});
