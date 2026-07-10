import type { Project, Task } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

type TaskWithProject = Task & { project: Project };

export const userTaskUpdateRepository = {
	findProjectByID: async (userID: string, projectID: string): Promise<Project | null> => {
		try {
			return await prisma.project.findFirst({ where: { id: projectID, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},

	findByID: async (userID: string, id: string): Promise<TaskWithProject | null> => {
		try {
			return await prisma.task.findFirst({
				where: { id, userID, deletedAt: null, project: { deletedAt: null } },
				include: { project: true },
			});
		} catch {
			return null;
		}
	},

	findByName: async (userID: string, projectID: string, name: string, id: string): Promise<Task | null> => {
		try {
			return await prisma.task.findFirst({
				where: { userID, projectID, name, deletedAt: null, id: { not: id } },
			});
		} catch {
			return null;
		}
	},

	update: async (
		id: string,
		projectID: string,
		name: string,
		description?: string,
	): Promise<TaskWithProject | null> => {
		try {
			return await prisma.task.update({
				where: { id },
				data: { projectID, name, description },
				include: { project: true },
			});
		} catch {
			return null;
		}
	},
};
