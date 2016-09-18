import _ from 'lodash';
import logger from '../../core/logger';
import express from 'express';

const LOG = logger('MOCK');
export const FEHLER_ID = '20161909';

const auftrag = require('./mock.auftrag.json');
const fehlerLaden = require('./mock.fehler.load.json');
const fehlerSpeichern = require('./mock.fehler.save.json');
const router = express.Router(); // eslint-disable-line new-cap

router.post('/orders/save', (req, res) => {
  LOG.debug('Request Body', req.body);

  const output = req.body.auftragId === FEHLER_ID ? fehlerSpeichern : auftrag;

  res.json(_.assign({}, output, {
    auftragId: req.body.auftragId
  }));
});

router.post('/orders/load', (req, res) => {
  LOG.debug('Request Body', req.body);
  LOG.debug('Request Headers', req.headers);

  const output = req.body.auftragId === FEHLER_ID ? fehlerLaden : auftrag;

  res.json(_.assign({}, output, {
    auftragId: req.body.auftragId
  }));
});

export default router;
