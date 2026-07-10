import type { Project, Task, WorkRecord } from '@prisma/client';
import { prisma } from '../../../../core/libs/prisma.lib.js';
import { snText } from '../../../../core/shared/utils/sn-text.helper.js';

type WorkRecordWithTask = WorkRecord & { task: Task & { project: Project } };

export const userWorkRecordCreateRepository = {
	findTaskByID: async (userID: string, taskID: string): Promise<(Task & { project: Project }) | null> => {
		try {
			return await prisma.task.findFirst({
				where: { id: taskID, userID, deletedAt: null, project: { deletedAt: null } },
				include: { project: true },
			});
		} catch {
			return null;
		}
	},

	findActiveByTaskID: async (userID: string, taskID: string): Promise<WorkRecord | null> => {
		try {
			return await prisma.workRecord.findFirst({ where: { userID, taskID, stoppedAt: null, deletedAt: null } });
		} catch {
			return null;
		}
	},

	create: async (userID: string, task: Task, startedAt: Date): Promise<WorkRecordWithTask | null> => {
		try {
			return await prisma.workRecord.create({
				data: { id: snText.unique(), userID, taskID: task.id, startedAt },
				include: { task: { include: { project: true } } },
			});
		} catch {
			return null;
		}
	},
};
