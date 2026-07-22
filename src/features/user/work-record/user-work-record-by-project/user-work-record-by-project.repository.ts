import type { Prisma } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export type UserWorkRecordByProjectRepositoryResponse = Prisma.ProjectGetPayload<{
	select: {
		id: true;
		name: true;
		tasks: {
			select: {
				id: true;
				name: true;
				description: true;
				workRecords: {
					select: { id: true; taskID: true; startedAt: true; stoppedAt: true; };
				};
			};
		};
	};
}>;

export const userWorkRecordByProjectRepository = {
	find: async (
		userID: string,
		take: number,
		skip: number
	): Promise<UserWorkRecordByProjectRepositoryResponse[]> => {
		try {
			return await prisma.project.findMany({
				where: { userID, deletedAt: null },
				select: {
					id: true,
					name: true,
					tasks: {
						where: { userID, deletedAt: null },
						select: {
							id: true,
							name: true,
							description: true,
							workRecords: {
								where: { userID, deletedAt: null },
								select: { id: true, taskID: true, startedAt: true, stoppedAt: true },
								orderBy: { startedAt: 'desc' },
							},
						},
						orderBy: { name: 'asc' },
					},
				},
				orderBy: [{ name: 'asc' }],
				take,
				skip,
			});
		} catch {
			return [];
		}
	},
};
