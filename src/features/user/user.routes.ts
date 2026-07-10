import { type Express } from 'express';
import { userForgotPasswordController } from './auth-flux/user-forgot-password/user-forgot-password.controller.js';
import { userLoginController } from './auth-flux/user-login/user-login.controller.js';
import { userRegisterController } from './auth-flux/user-register/user-register.controller.js';
import { userTwoFactorAuthInitController } from './auth-flux/user-two-factor-auth-init/user-two-factor-auth-init.controller.js';
import { userTwoFactorAuthVerificationController } from './auth-flux/user-two-factor-auth-verification/user-two-factor-auth-verification.controller.js';
import { jweMiddleware as jwe } from '../../core/middlewares/jwe.middleware.js';
import { userMiddleware as auth } from './user.middleware.js';

import { userProjectCreateController } from './project/user-project-create/user-project-create.controller.js';
import { userProjectDeleteController } from './project/user-project-delete/user-project-delete.controller.js';
import { userProjectFindController } from './project/user-project-find/user-project-find.controller.js';
import { userProjectFindOneController } from './project/user-project-find-one/user-project-find-one.controller.js';
import { userProjectUpdateController } from './project/user-project-update/user-project-update.controller.js';
import { userTaskCreateController } from './task/user-task-create/user-task-create.controller.js';
import { userTaskDeleteController } from './task/user-task-delete/user-task-delete.controller.js';
import { userTaskFindController } from './task/user-task-find/user-task-find.controller.js';
import { userTaskFindOneController } from './task/user-task-find-one/user-task-find-one.controller.js';
import { userTaskUpdateController } from './task/user-task-update/user-task-update.controller.js';
import { userWorkRecordCreateController } from './work-record/user-work-record-create/user-work-record-create.controller.js';
import { userWorkRecordDeleteController } from './work-record/user-work-record-delete/user-work-record-delete.controller.js';
import { userWorkRecordFindController } from './work-record/user-work-record-find/user-work-record-find.controller.js';
import { userWorkRecordStopAllController } from './work-record/user-work-record-stop-all/user-work-record-stop-all.controller.js';
import { userWorkRecordStopController } from './work-record/user-work-record-stop/user-work-record-stop.controller.js';
import { userWorkRecordUpdateController } from './work-record/user-work-record-update/user-work-record-update.controller.js';

export function userRoutes(app: Express) {
	const prefix = '/api/v1/user';

	// AUTH FLUX
	app.post(`${prefix}/two-factor-auth/init`, jwe.decode, userTwoFactorAuthInitController, jwe.encode);
	app.post(`${prefix}/two-factor-auth/verification`, jwe.decode, userTwoFactorAuthVerificationController, jwe.encode);
	app.post(`${prefix}/register`, jwe.decode, userRegisterController, jwe.encode);
	app.post(`${prefix}/login`, jwe.decode, userLoginController, jwe.encode);
	app.post(`${prefix}/forgot-password`, jwe.decode, userForgotPasswordController, jwe.encode);

	// PROJECTS
	app.post(`${prefix}/project/create`, jwe.decode, auth, userProjectCreateController, jwe.encode);
	app.post(`${prefix}/project/find`, jwe.decode, auth, userProjectFindController, jwe.encode);
	app.post(`${prefix}/project/find-one`, jwe.decode, auth, userProjectFindOneController, jwe.encode);
	app.put(`${prefix}/project/update`, jwe.decode, auth, userProjectUpdateController, jwe.encode);
	app.post(`${prefix}/project/delete`, jwe.decode, auth, userProjectDeleteController, jwe.encode);

	// TASKS
	app.post(`${prefix}/task/create`, jwe.decode, auth, userTaskCreateController, jwe.encode);
	app.post(`${prefix}/task/find`, jwe.decode, auth, userTaskFindController, jwe.encode);
	app.post(`${prefix}/task/find-one`, jwe.decode, auth, userTaskFindOneController, jwe.encode);
	app.put(`${prefix}/task/update`, jwe.decode, auth, userTaskUpdateController, jwe.encode);
	app.post(`${prefix}/task/delete`, jwe.decode, auth, userTaskDeleteController, jwe.encode);

	// WORK RECORDS
	app.post(`${prefix}/work-record/create`, jwe.decode, auth, userWorkRecordCreateController, jwe.encode);
	app.post(`${prefix}/work-record/find`, jwe.decode, auth, userWorkRecordFindController, jwe.encode);
	app.put(`${prefix}/work-record/update`, jwe.decode, auth, userWorkRecordUpdateController, jwe.encode);
	app.post(`${prefix}/work-record/stop`, jwe.decode, auth, userWorkRecordStopController, jwe.encode);
	app.post(`${prefix}/work-record/stop-all`, jwe.decode, auth, userWorkRecordStopAllController, jwe.encode);
	app.post(`${prefix}/work-record/delete`, jwe.decode, auth, userWorkRecordDeleteController, jwe.encode);
}
