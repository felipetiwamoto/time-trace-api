import type { Project, Task, WorkRecord } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

type WorkRecordWithTask = WorkRecord & { task: Task & { project: Project } };

export const userWorkRecordFindRepository = {
	find: async (
		userID: string,
		take: number,
		skip: number,
		options: { taskID?: string; startedAtFrom?: Date; startedAtTo?: Date },
	): Promise<WorkRecordWithTask[]> => {
		try {
			return await prisma.workRecord.findMany({
				where: {
					userID,
					taskID: options.taskID,
					deletedAt: null,
					task: { deletedAt: null, project: { deletedAt: null } },
					startedAt:
						options.startedAtFrom || options.startedAtTo
							? { gte: options.startedAtFrom, lt: options.startedAtTo }
							: undefined,
				},
				include: { task: { include: { project: true } } },
				orderBy: { startedAt: 'desc' },
				take,
				skip,
			});
		} catch {
			return [];
		}
	},
};
