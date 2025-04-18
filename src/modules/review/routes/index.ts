import {Router} from 'express';
import {Role} from '@prisma/client';
import {checkRole} from '../../../core/middleware/checkRole';
import {createReview} from '../controllers/createReview.controller';
import {getReviews} from '../controllers/getReviews.controller';
import {authMiddleware} from '../../../core/middleware/authMiddleware';
import {updateReview} from '../controllers/updateReview.controller';
import {deleteReview} from '../controllers/deleteReview.controller';

const reviewRouter = Router();

reviewRouter.get('/', authMiddleware, getReviews);

reviewRouter.post('/:orderId', checkRole(Role.CUSTOMER), createReview);

// reviewRouter.get('/:targetId', authMiddleware, getReviews);

reviewRouter.patch(
    '/:reviewId',
    checkRole([Role.CUSTOMER, Role.ADMIN]),
    updateReview
);

reviewRouter.delete(
    '/:reviewId',
    checkRole([Role.CUSTOMER, Role.ADMIN]),
    deleteReview
);

export default reviewRouter;
