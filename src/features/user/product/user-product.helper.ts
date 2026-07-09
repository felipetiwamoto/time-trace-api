import type { Product, ProductCategory, ProductTag } from '../../../core/libs/prisma/client.js';
import type { Request } from 'express';

type ProductWithRelations = Product & {
	productTags: Array<{ productTag: ProductTag }>;
	productCategories: Array<{ productCategory: ProductCategory }>;
};

const parseStringArray = (value: unknown): string[] => {
	if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
	if (typeof value !== 'string' || value.trim() === '') return [];

	try {
		const parsed: unknown = JSON.parse(value);
		return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
	} catch {
		return [];
	}
};

const inferMimeType = (buffer: Buffer) => {
	if (buffer.length >= 8 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47)
		return 'image/png';
	if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg';
	if (buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP')
		return 'image/webp';
	if (buffer.length >= 3 && buffer.toString('ascii', 0, 3) === 'GIF') return 'image/gif';

	return 'application/octet-stream';
};

export const parseUserProductPayload = (req: Request) => {
	return {
		id: typeof req.body?.id === 'string' ? req.body.id : '',
		name: typeof req.body?.name === 'string' ? req.body.name : '',
		description: typeof req.body?.description === 'string' ? req.body.description : '',
		price: typeof req.body?.price === 'string' || typeof req.body?.price === 'number' ? req.body.price : '',
		tags: parseStringArray(req.body?.tags),
		categories: parseStringArray(req.body?.categories),
		userAuthID: typeof req.body?.userAuthID === 'string' ? req.body.userAuthID : '',
	};
};

export const productImageToDataURL = (image?: Uint8Array | Buffer | null) => {
	if (!image) return null;

	const buffer = Buffer.isBuffer(image) ? image : Buffer.from(image);
	return `data:${inferMimeType(buffer)};base64,${buffer.toString('base64')}`;
};

export const userProductResponse = (product: ProductWithRelations) => ({
	id: product.id,
	name: product.name,
	description: product.description,
	image: productImageToDataURL(product.image),
	price: Number(product.price),
	tags: product.productTags.map((item) => ({ id: item.productTag.id, name: item.productTag.name })),
	categories: product.productCategories.map((item) => ({
		id: item.productCategory.id,
		name: item.productCategory.name,
	})),
});

export const userProductsResponse = (products: ProductWithRelations[]) => products.map(userProductResponse);
