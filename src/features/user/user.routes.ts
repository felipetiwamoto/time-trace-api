import { type Express } from 'express';
import { userForgotPasswordController } from './auth-flux/user-forgot-password/user-forgot-password.controller.js';
import { userLoginController } from './auth-flux/user-login/user-login.controller.js';
import { userRegisterController } from './auth-flux/user-register/user-register.controller.js';
import { userTwoFactorAuthInitController } from './auth-flux/user-two-factor-auth-init/user-two-factor-auth-init.controller.js';
import { userTwoFactorAuthVerificationController } from './auth-flux/user-two-factor-auth-verification/user-two-factor-auth-verification.controller.js';
import { jweMiddleware as jwe } from '../../core/middlewares/jwe.middleware.js';
import { userMiddleware as auth } from './user.middleware.js';

// TAGS
import { userProductTagController } from './product-tag/user-product-tag-create/user-product-tag-create.controller.js';
import { userProductTagFindController } from './product-tag/user-product-tag-find/user-product-tag-find.controller.js';
import { userProductTagFindOneController } from './product-tag/user-product-tag-find-one/user-product-tag-find-one.controller.js';
import { userProductTagUpdateController } from './product-tag/user-product-tag-update/user-product-tag-update.controller.js';
import { userProductTagDeleteController } from './product-tag/user-product-tag-delete/user-product-tag-delete.controller.js';

// CATEGORIES
import { userProductCategoryCreateController } from './product-category/user-product-category-create/user-product-category-create.controller.js';
import { userProductCategoryFindController } from './product-category/user-product-category-find/user-product-category-find.controller.js';
import { userProductCategoryFindOneController } from './product-category/user-product-category-find-one/user-product-category-find-one.controller.js';
import { userProductCategoryUpdateController } from './product-category/user-product-category-update/user-product-category-update.controller.js';
import { userProductCategoryDeleteController } from './product-category/user-product-category-delete/user-product-category-delete.controller.js';

// MENUS
import { userProductMenuController } from './product-menu/user-product-menu-create/user-product-menu-create.controller.js';
import { userProductMenuFindController } from './product-menu/user-product-menu-find/user-product-menu-find.controller.js';
import { userProductMenuFindOneController } from './product-menu/user-product-menu-find-one/user-product-menu-find-one.controller.js';
import { userProductMenuUpdateController } from './product-menu/user-product-menu-update/user-product-menu-update.controller.js';
import { userProductMenuDeleteController } from './product-menu/user-product-menu-delete/user-product-menu-delete.controller.js';

// PRODUCTS
import { userProductCreateController } from './product/user-product-create/user-product-create.controller.js';
import { userProductFindController } from './product/user-product-find/user-product-find.controller.js';
import { userProductFindOneController } from './product/user-product-find-one/user-product-find-one.controller.js';
import { userProductUpdateController } from './product/user-product-update/user-product-update.controller.js';
import { userProductDeleteController } from './product/user-product-delete/user-product-delete.controller.js';

export function userRoutes(app: Express) {
	const prefix = '/api/v1/user';

	// AUTH FLUX
	app.post(`${prefix}/two-factor-auth/init`, jwe.decode, userTwoFactorAuthInitController, jwe.encode);
	app.post(`${prefix}/two-factor-auth/init`, jwe.decode, userTwoFactorAuthInitController, jwe.encode);
	app.post(`${prefix}/two-factor-auth/verification`, jwe.decode, userTwoFactorAuthVerificationController, jwe.encode);
	app.post(`${prefix}/register`, jwe.decode, userRegisterController, jwe.encode);
	app.post(`${prefix}/login`, jwe.decode, userLoginController, jwe.encode);
	app.post(`${prefix}/forgot-password`, jwe.decode, userForgotPasswordController, jwe.encode);

	// TAGS
	app.post(`${prefix}/product-tag/create`, jwe.decode, auth, userProductTagController, jwe.encode);
	app.post(`${prefix}/product-tag/find`, jwe.decode, auth, userProductTagFindController, jwe.encode);
	app.post(`${prefix}/product-tag/find-one`, jwe.decode, auth, userProductTagFindOneController, jwe.encode);
	app.put(`${prefix}/product-tag/update`, jwe.decode, auth, userProductTagUpdateController, jwe.encode);
	app.post(`${prefix}/product-tag/delete`, jwe.decode, auth, userProductTagDeleteController, jwe.encode);

	// CATEGORIES
	app.post(`${prefix}/product-category/create`, jwe.decode, auth, userProductCategoryCreateController, jwe.encode);
	app.post(`${prefix}/product-category/find`, jwe.decode, auth, userProductCategoryFindController, jwe.encode);
	app.post(`${prefix}/product-category/find-one`, jwe.decode, auth, userProductCategoryFindOneController, jwe.encode);
	app.put(`${prefix}/product-category/update`, jwe.decode, auth, userProductCategoryUpdateController, jwe.encode);
	app.post(`${prefix}/product-category/delete`, jwe.decode, auth, userProductCategoryDeleteController, jwe.encode);

	// MENUS
	app.post(`${prefix}/product-menu/create`, jwe.decode, auth, userProductMenuController, jwe.encode);
	app.post(`${prefix}/product-menu/find`, jwe.decode, auth, userProductMenuFindController, jwe.encode);
	app.post(`${prefix}/product-menu/find-one`, jwe.decode, auth, userProductMenuFindOneController, jwe.encode);
	app.put(`${prefix}/product-menu/update`, jwe.decode, auth, userProductMenuUpdateController, jwe.encode);
	app.post(`${prefix}/product-menu/delete`, jwe.decode, auth, userProductMenuDeleteController, jwe.encode);

	// PRODUCTS
	app.post(`${prefix}/product/create`, jwe.decode, auth, userProductCreateController, jwe.encode);
	app.post(`${prefix}/product/find`, jwe.decode, auth, userProductFindController, jwe.encode);
	app.post(`${prefix}/product/find-one`, jwe.decode, auth, userProductFindOneController, jwe.encode);
	app.put(`${prefix}/product/update`, jwe.decode, auth, userProductUpdateController, jwe.encode);
	app.post(`${prefix}/product/delete`, jwe.decode, auth, userProductDeleteController, jwe.encode);
}
