import {Router} from 'express';
import * as ReviewController from './review.controller';
import {authMiddleware} from '../../middleware/authMiddleware';
import {roleMiddleware} from '../../middleware/roleMiddleware';
import {validateDto} from '../../middleware/validate';
import {CreateReviewDTO} from './dto/createReview.dto';
import {UpdateReviewDTO} from './dto/updateReview.dto';

export const reviewRouter = Router();

reviewRouter.use(authMiddleware, roleMiddleware(['CUSTOMER']));

reviewRouter.post(
    '/',
    validateDto(CreateReviewDTO),
    ReviewController.createReview
);
reviewRouter.put(
    '/:id',
    validateDto(UpdateReviewDTO),
    ReviewController.updateReview
);
reviewRouter.delete('/:id', ReviewController.deleteReview);
