import { prisma } from '../../../../core/libs/prisma.lib.js';

export const userWorkRecordStopAllRepository = {
	stopAll: async (userID: string, stoppedAt: Date) => {
		try {
			return await prisma.workRecord.updateMany({
				where: { userID, stoppedAt: null, deletedAt: null },
				data: { stoppedAt },
			});
		} catch {
			return null;
		}
	},
};
