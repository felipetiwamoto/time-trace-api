import type { Project, Task } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

type TaskWithProject = Task & { project: Project };

export const userTaskCreateRepository = {
	findProjectByID: async (userID: string, projectID: string): Promise<Project | null> => {
		try {
			return await prisma.project.findFirst({ where: { id: projectID, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},

	findByName: async (userID: string, projectID: string, name: string): Promise<Task | null> => {
		try {
			return await prisma.task.findFirst({ where: { userID, projectID, name, deletedAt: null } });
		} catch {
			return null;
		}
	},

	create: async (
		userID: string,
		projectID: string,
		name: string,
		description?: string,
	): Promise<TaskWithProject | null> => {
		try {
			return await prisma.task.create({
				data: { id: snText.unique(), userID, projectID, name, description },
				include: { project: true },
			});
		} catch {
			return null;
		}
	},
};
