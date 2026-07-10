import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userTaskDeleteRepository = {
	deleteMany: async (userID: string, ids: string[]) => {
		try {
			return await prisma.task.deleteMany({ where: { userID, id: { in: ids } } });
		} catch {
			return null;
		}
	},
};
