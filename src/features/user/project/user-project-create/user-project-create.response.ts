import type { Project } from '@prisma/client';

export type UserProjectCreateResponse = {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export const userProjectCreateResponse = (project: Project): UserProjectCreateResponse => ({
	id: project.id,
	name: project.name,
	createdAt: project.createdAt.toISOString(),
	updatedAt: project.updatedAt.toISOString(),
});
