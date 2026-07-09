import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const requiredEnv = (value: string | undefined, name: string): string => {
	if (!value) throw new Error(`Missing environment variable: ${name}`);
	return value;
};

const adapter = new PrismaMariaDb({
	host: requiredEnv(process.env.DATABASE_HOST, 'DATABASE_HOST'),
	user: requiredEnv(process.env.DATABASE_USER, 'DATABASE_USER'),
	password: requiredEnv(process.env.DATABASE_PASSWORD, 'DATABASE_PASSWORD'),
	database: requiredEnv(process.env.DATABASE_NAME, 'DATABASE_NAME'),
	connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
