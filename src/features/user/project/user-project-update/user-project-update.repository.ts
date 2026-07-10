import type { Project } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProjectUpdateRepository = {
	findByID: async (userID: string, id: string): Promise<Project | null> => {
		try {
			return await prisma.project.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},

	findByName: async (userID: string, name: string, id: string): Promise<Project | null> => {
		try {
			return await prisma.project.findFirst({ where: { userID, name, deletedAt: null, id: { not: id } } });
		} catch {
			return null;
		}
	},

	update: async (id: string, name: string): Promise<Project | null> => {
		try {
			return await prisma.project.update({ where: { id }, data: { name } });
		} catch {
			return null;
		}
	},
};
