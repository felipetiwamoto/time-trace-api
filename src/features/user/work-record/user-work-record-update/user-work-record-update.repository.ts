import type { Project, Task, WorkRecord } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

type WorkRecordWithTask = WorkRecord & { task: Task & { project: Project } };

export const userWorkRecordUpdateRepository = {
	findByID: async (userID: string, id: string): Promise<WorkRecord | null> => {
		try {
			return await prisma.workRecord.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},

	update: async (id: string, startedAt: Date, stoppedAt: Date): Promise<WorkRecordWithTask | null> => {
		try {
			return await prisma.workRecord.update({
				where: { id },
				data: { startedAt, stoppedAt },
				include: { task: { include: { project: true } } },
			});
		} catch {
			return null;
		}
	},
};
