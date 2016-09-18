import express from 'express';
import intl from './intl';
import logger from './logger';
import query from './query';
import rgfRoutes from './rgf-routes';
import { getStoredQueries, setStoredQueries } from './stored-queries';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/about', (req, res) => {
  res.json({
    version: '1.0'
  });
});

router.get('/intl/:lang', intl);
router.get('/stored-queries/:entity', getStoredQueries);
router.post('/query', query);
router.post('/stored-queries/:entity', setStoredQueries);

router.use('/rgf', rgfRoutes);
router.use('/log', logger);

export default router;
