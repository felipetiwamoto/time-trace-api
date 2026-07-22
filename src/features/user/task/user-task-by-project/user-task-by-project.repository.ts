import type { Prisma } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

export type UserTaskByProjectRepositoryResponse = Prisma.ProjectGetPayload<{
	select: {
		id: true;
		name: true;
		tasks: { select: { id: true; name: true; description: true; }; };
	};
}>;

export const userTaskByProjectRepository = {
	find: async (userID: string, take: number, skip: number): Promise<UserTaskByProjectRepositoryResponse[]> => {
		try {
			return await prisma.project.findMany({
				where: { userID, deletedAt: null },
				select: {
					id: true,
					name: true,
					tasks: {
						where: { userID, deletedAt: null },
						select: { id: true, name: true, description: true },
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
