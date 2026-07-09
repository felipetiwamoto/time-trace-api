import type { ZodError } from "zod";

export const snResponse = <T>(statusCode: number, message: string, zod: ZodError<T> | null) => {
	if (!zod) return { statusCode, message };
	
	const errors = zod.issues.map((issue) => ({
		field: issue.path.join("."),
		message: issue.message,
	}));

	return { statusCode, message, errors };
};
