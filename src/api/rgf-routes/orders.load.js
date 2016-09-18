import fetch from '../../core/fetch';
import config from '../../core/config';
import logger from '../../core/logger';

const log = logger('BACKEND');

export default async (clientRequest, clientResponse) => {
  const url = `${config.get('RGF_MODUL.URL')}/orders/load`;

  const rgfmodulRequestContent = {
    auftragId: clientRequest.params.id
  };

  const rgfmodulResponse = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(rgfmodulRequestContent)
  });

  const rgfmodulResponseContent = await rgfmodulResponse.json();

  log.debug(url);
  log.debug('Request Content', rgfmodulRequestContent);
  log.debug('Response Content', rgfmodulResponseContent);

  clientResponse.json(rgfmodulResponseContent);
};
