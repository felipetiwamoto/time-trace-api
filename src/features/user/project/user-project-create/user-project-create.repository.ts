import type { Project } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

export const userProjectCreateRepository = {
	findByName: async (userID: string, name: string): Promise<Project | null> => {
		try {
			return await prisma.project.findFirst({ where: { userID, name, deletedAt: null } });
		} catch {
			return null;
		}
	},

	create: async (userID: string, name: string): Promise<Project | null> => {
		try {
			return await prisma.project.create({ data: { id: snText.unique(), userID, name } });
		} catch {
			return null;
		}
	},
};
