import _ from 'lodash';
import config from '../../core/config';
import fetch from '../../core/fetch';
import logger from '../../core/logger';

const log = logger('BACKEND');

export default async (clientRequest, clientResponse) => {
  const url = `${config.get('RGF_MODUL.URL')}/orders/save`;

  const rgfmodulRequestContent = _.assign({}, clientRequest.body, {
    auftragId: clientRequest.params.id
  });

  const rgfmodulResponse = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(rgfmodulRequestContent)
  });

  const response = _.assign({}, rgfmodulRequestContent, await rgfmodulResponse.json());

  log.debug('Request Content', clientRequest.body);
  log.debug('Response Content', response);

  clientResponse.json(response);
};
