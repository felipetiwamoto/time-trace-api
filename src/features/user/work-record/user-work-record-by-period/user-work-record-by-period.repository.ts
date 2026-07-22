import type { Prisma } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export type UserWorkRecordByPeriodRepositoryResponse = Prisma.TaskGetPayload<{
	select: {
		id: true;
		projectID: true;
		name: true;
		description: true;
		project: { select: { id: true; name: true; }; };
		workRecords: {
			select: { id: true; taskID: true; startedAt: true; stoppedAt: true };
		};
	};
}>;

export const userWorkRecordByPeriodRepository = {
	find: async (userID: string, from: Date, to: Date): Promise<UserWorkRecordByPeriodRepositoryResponse[]> => {
		try {
			return await prisma.task.findMany({
				where: {
					userID,
					deletedAt: null,
					project: { deletedAt: null },
					workRecords: { some: { userID, deletedAt: null, startedAt: { gte: from, lte: to } } },
				},
				select: {
					id: true,
					projectID: true,
					name: true,
					description: true,
					project: { select: { id: true, name: true, } },
					workRecords: {
						where: { userID, deletedAt: null, startedAt: { gte: from, lte: to } },
						select: { id: true, taskID: true, startedAt: true, stoppedAt: true },
						orderBy: { startedAt: 'desc' },
					},
				},
				orderBy: [{ project: { name: 'asc' } }, { name: 'asc' }],
			});
		} catch {
			return [];
		}
	},
};
