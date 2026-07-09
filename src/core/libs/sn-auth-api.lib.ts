import 'dotenv/config';
import type { TokenContext } from './prisma/enums.js';

const SN_AUTH_API_BASE_URL = process.env.SN_AUTH_API_BASE_URL;
const SN_AUTH_API_API_KEY = process.env.SN_AUTH_API_API_KEY;
const SN_AUTH_API_COMPANY_API_KEY = process.env.SN_AUTH_API_COMPANY_API_KEY;

const headers: Record<string, string> = {
	'content-type': 'application/json',
	'x-sn-auth-api-key': String(SN_AUTH_API_API_KEY),
	'x-company-api-key': String(SN_AUTH_API_COMPANY_API_KEY),
};

export const snAuthAPILib = {
	twoFactorAuthInit: async ({ email, tokenContext }: { email: string; tokenContext: TokenContext }) => {
		if (!SN_AUTH_API_BASE_URL || !SN_AUTH_API_API_KEY || !SN_AUTH_API_COMPANY_API_KEY) {
			throw new Error('SN auth API env vars are not configured');
		}

		const res = await fetch(`${SN_AUTH_API_BASE_URL}/api/v1/company-user/two-factor-auth/init`, {
			method: 'POST',
			body: JSON.stringify({ email, tokenContext }),
			headers,
		})
			.then((res) => res.json())
			.catch(console.log);

		return res;
	},
	twoFactorAuthVerification: async ({
		email,
		token,
		tokenContext,
	}: {
		email: string;
		token: string;
		tokenContext: TokenContext;
	}) => {
		if (!SN_AUTH_API_BASE_URL || !SN_AUTH_API_API_KEY || !SN_AUTH_API_COMPANY_API_KEY) {
			throw new Error('SN auth API env vars are not configured');
		}

		const res = await fetch(`${SN_AUTH_API_BASE_URL}/api/v1/company-user/two-factor-auth/verification`, {
			method: 'POST',
			body: JSON.stringify({ email, token, tokenContext }),
			headers,
		})
			.then((res) => res.json())
			.catch(console.log);

		return res;
	},
	register: async ({
		name,
		email,
		password,
		confirmPassword,
	}: {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}) => {
		if (!SN_AUTH_API_BASE_URL || !SN_AUTH_API_API_KEY || !SN_AUTH_API_COMPANY_API_KEY) {
			throw new Error('SN auth API env vars are not configured');
		}

		const res = await fetch(`${SN_AUTH_API_BASE_URL}/api/v1/company-user/register`, {
			method: 'POST',
			body: JSON.stringify({ name, email, password, confirmPassword }),
			headers,
		})
			.then((res) => res.json())
			.catch(console.log);

		return res;
	},
	login: async ({ email, password }: { email: string; password: string }) => {
		if (!SN_AUTH_API_BASE_URL || !SN_AUTH_API_API_KEY || !SN_AUTH_API_COMPANY_API_KEY) {
			throw new Error('SN auth API env vars are not configured');
		}

		const res = await fetch(`${SN_AUTH_API_BASE_URL}/api/v1/company-user/login`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers,
		})
			.then((res) => res.json())
			.catch(console.log);

		return res;
	},
	forgotPassword: async ({
		email,
		newPassword,
		confirmNewPassword,
	}: {
		email: string;
		newPassword: string;
		confirmNewPassword: string;
	}) => {
		if (!SN_AUTH_API_BASE_URL || !SN_AUTH_API_API_KEY || !SN_AUTH_API_COMPANY_API_KEY) {
			throw new Error('SN auth API env vars are not configured');
		}

		const res = await fetch(`${SN_AUTH_API_BASE_URL}/api/v1/company-user/forgot-password`, {
			method: 'POST',
			body: JSON.stringify({ email, newPassword, confirmNewPassword }),
			headers,
		})
			.then((res) => res.json())
			.catch(console.log);

		return res;
	},
};
