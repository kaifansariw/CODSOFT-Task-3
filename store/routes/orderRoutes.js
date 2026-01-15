import express from 'express';
import { addOrderItems, getOrderById, createPaymentIntent } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/payment/intent').post(protect, createPaymentIntent);

export default router;
