import _ from 'lodash';
import fs from 'fs';
import { join } from 'path';
import Promise from 'bluebird';

const readFile = Promise.promisify(fs.readFile);

export default (req, res) => {
  const //
    CONTENT_DIR = join(__dirname, 'messages'),
    lang = req.params.lang;


  readFile(join(CONTENT_DIR, `${lang}.json`)).then(localeData => {
    res.json(
      _.reduce(
        JSON.parse(localeData),
        (result, message) => _.assign(result, {
            [message.id]: message.message
          }),
        {}));
  }).catch(error => {
    throw error;
  });
};
