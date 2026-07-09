import type { User as UserModel } from '@prisma/client';

export type UserRegisterResponse = {
	id: string;
	name: string;
	email: string;
};

export const userRegisterResponse = (user: { id: string; name: string; email: string }): UserRegisterResponse => ({
	id: user.id,
	name: user.name,
	email: user.email,
});
