import type { Project } from '@prisma/client';

export type UserProjectFindOneResponse = {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export const userProjectFindOneResponse = (project: Project): UserProjectFindOneResponse => ({
	id: project.id,
	name: project.name,
	createdAt: project.createdAt.toISOString(),
	updatedAt: project.updatedAt.toISOString(),
});
