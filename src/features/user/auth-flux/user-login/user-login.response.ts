import type { User as UserModel } from '@prisma/client';

export type UserLoginResponse = {
	id: string;
	name: string;
	email: string;
};

export const userLoginResponse = (user: { id: string; name: string; email: string }): UserLoginResponse => ({
	id: user.id,
	name: user.name,
	email: user.email,
});
