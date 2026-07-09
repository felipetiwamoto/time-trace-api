import type { User as UserModel } from '@prisma/client';

export type UserForgotPasswordResponse = {
	id: string;
	name: string;
	email: string;
};

export const userForgotPasswordResponse = (user: {
	id: string;
	name: string;
	email: string;
}): UserForgotPasswordResponse => ({
	id: user.id,
	name: user.name,
	email: user.email,
});
