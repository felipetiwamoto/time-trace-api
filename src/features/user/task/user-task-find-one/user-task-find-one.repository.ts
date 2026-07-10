import type { Project, Task } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

type TaskWithProject = Task & { project: Project };

export const userTaskFindOneRepository = {
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
};
