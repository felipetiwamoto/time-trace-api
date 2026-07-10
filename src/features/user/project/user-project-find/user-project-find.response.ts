import type { Project } from '@prisma/client';

export type UserProjectFindItemResponse = {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export type UserProjectFindResponse = UserProjectFindItemResponse[];

export const userProjectFindResponse = (projects: Project[]): UserProjectFindResponse =>
	projects.map((project) => ({
		id: project.id,
		name: project.name,
		createdAt: project.createdAt.toISOString(),
		updatedAt: project.updatedAt.toISOString(),
	}));
