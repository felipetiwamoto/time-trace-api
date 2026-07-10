import type { Project } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProjectFindRepository = {
	find: async (userID: string, take: number, skip: number): Promise<Project[]> => {
		try {
			return await prisma.project.findMany({
				where: { userID, deletedAt: null },
				orderBy: { createdAt: 'desc' },
				take,
				skip,
			});
		} catch {
			return [];
		}
	},
};
