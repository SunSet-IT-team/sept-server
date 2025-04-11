import {Router} from 'express';

import {registerExecutor} from '../controllers/registerExecutor.controller';
import {upload} from '../../../core/middleware/upload';
import {login} from '../controllers/login.controller';
import {registerCustomer} from '../controllers/registerCustomer.controller';
import {verifyEmail} from '../services/verifyEmail.service';
import {sendVerificationCode} from '../controllers/sendVerificationCode.controller';
import {adminRecovery} from '../controllers/adminRecovery.controller';

export const authRouter = Router();

authRouter.post('/login/admin', login);
authRouter.post('/login/executor', login);
authRouter.post('/login/customer', login);

authRouter.post(
    '/register/executor',
    upload.fields([
        {name: 'profilePhoto', maxCount: 1},
        {name: 'registrationDoc', maxCount: 5},
        {name: 'licenseDoc', maxCount: 5},
        {name: 'otherFiles', maxCount: 10},
    ]),
    registerExecutor
);

authRouter.post('/register/customer', registerCustomer);

authRouter.get('/verify/:code', verifyEmail);
authRouter.post('/verify', sendVerificationCode);
authRouter.post('/recovery/admin', adminRecovery);
