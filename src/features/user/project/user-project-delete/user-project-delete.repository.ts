import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userProjectDeleteRepository = {
	deleteMany: async (userID: string, ids: string[]) => {
		try {
			return await prisma.project.deleteMany({ where: { userID, id: { in: ids } } });
		} catch {
			return null;
		}
	},
};
