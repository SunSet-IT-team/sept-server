import {Router} from 'express';

import {registerExecutor} from '../controllers/registerExecutor.controller';
import {upload} from '../../../core/middleware/upload';
import {login} from '../controllers/login.controller';
import {registerCustomer} from '../controllers/registerCustomer.controller';
import {verifyEmail} from '../controllers/verifyEmail.controller';
import {adminRecovery} from '../controllers/adminRecovery.controller';
import {resendVerification} from '../controllers/resendVerification.controller';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {changePassword} from '../controllers/recoveryUser.controller';
import {forgotPassword} from '../controllers/forgotPassword.controller';
import {resetPassword} from '../controllers/resetPassword.controller';

export const authRouter = Router();

authRouter.post('/login/admin', login);
authRouter.post('/login/executor', login);
authRouter.post(
    '/login/customer',
    upload.fields([{name: 'profilePhoto', maxCount: 1}]),
    login
);

authRouter.post(
    '/register/executor',
    upload.fields([
        {name: 'profilePhoto', maxCount: 1},
        {name: 'registrationDoc', maxCount: 5},
        {name: 'licenseDoc', maxCount: 5},
    ]),
    registerExecutor
);
authRouter.post(
    '/register/customer',
    upload.fields([{name: 'profilePhoto', maxCount: 1}]),
    registerCustomer
);

authRouter.post('/verify', verifyEmail);
authRouter.post('/verify/resend', resendVerification);
authRouter.post('/recovery/admin', adminRecovery);

authRouter.post('/password/change', authMiddleware, changePassword);

authRouter.post('/password/forgot', forgotPassword);
authRouter.post('/password/reset', resetPassword);
