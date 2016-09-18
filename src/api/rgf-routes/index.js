import express from 'express';

import ordersLoad from './orders.load';
import ordersSave from './orders.save';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/orders/:id', ordersLoad);
router.post('/orders/:id', ordersSave);

export default router;
