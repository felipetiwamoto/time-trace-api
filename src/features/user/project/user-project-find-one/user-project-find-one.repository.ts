import type { Project } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProjectFindOneRepository = {
	findByID: async (userID: string, id: string): Promise<Project | null> => {
		try {
			return await prisma.project.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},
};
