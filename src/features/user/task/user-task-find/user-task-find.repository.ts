import type { Project, Task } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

type TaskWithProject = Task & { project: Project };

export const userTaskFindRepository = {
	find: async (userID: string, take: number, skip: number, projectID?: string): Promise<TaskWithProject[]> => {
		try {
			return await prisma.task.findMany({
				where: { userID, projectID, deletedAt: null, project: { deletedAt: null } },
				include: { project: true },
				orderBy: { createdAt: 'desc' },
				take,
				skip,
			});
		} catch {
			return [];
		}
	},
};
