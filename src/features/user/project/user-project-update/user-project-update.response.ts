import type { Project } from '@prisma/client';

export type UserProjectUpdateResponse = {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export const userProjectUpdateResponse = (project: Project): UserProjectUpdateResponse => ({
	id: project.id,
	name: project.name,
	createdAt: project.createdAt.toISOString(),
	updatedAt: project.updatedAt.toISOString(),
});
