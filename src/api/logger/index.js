import express from 'express';
import logger from '../../core/logger';

const router = express.Router(); // eslint-disable-line new-cap

router.post('/', (req, res) => {
  if (process.env.NODE_ENV !== 'production') { // we never do this in production for security reasons.
    const msg = req.body;
    logger(`${msg.category}`, 'CLIENT')[msg.level](msg.message, msg.meta);
  }
  res.json(req.body);
});

export default router;
