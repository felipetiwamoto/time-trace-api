import type { Project, Task, WorkRecord } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';

type WorkRecordWithTask = WorkRecord & { task: Task & { project: Project } };

export const userWorkRecordStopRepository = {
	findByID: async (userID: string, id: string): Promise<WorkRecord | null> => {
		try {
			return await prisma.workRecord.findFirst({ where: { id, userID, deletedAt: null } });
		} catch {
			return null;
		}
	},

	stop: async (id: string, stoppedAt: Date): Promise<WorkRecordWithTask | null> => {
		try {
			return await prisma.workRecord.update({
				where: { id },
				data: { stoppedAt },
				include: { task: { include: { project: true } } },
			});
		} catch {
			return null;
		}
	},
};
