import _ from 'lodash';
import { expect } from 'chai';
import fs from 'fs';
import request from 'request';

const CLIENT_KEY = process.env.CLIENT_KEY || process.argv[2] || 'REPLACE_THIS_KEY';
const CLIENT_SECRET = process.env.CLIENT_SECRET || process.argv[3] || 'REPLACE_THIS_KEY';
const MAX_CALLS = process.env.MAX_CALLS || process.argv[4] || 10;
const PAUSE = process.env.PAUSE || process.argv[5] || 5;
const PARALLEL = process.env.PARALLEL || process.argv[6];

const FILES = [
  "./docs/samples/DischargeLetterI1.txt",
  "./docs/samples/DischargeLetterI2.txt",
  "./docs/samples/DischargeLetterI3.txt",
  "./docs/samples/DischargeLetterK1.txt",
  "./docs/samples/DischargeLetterK2.txt",
  "./docs/samples/DischargeLetterK3.txt"
];

const SAMPLES = _.map(FILES, s => fs.readFileSync(s, "utf8"));

const FUNCS = [
  "diagnosis",
  "symptom",
  "medication"
];

const options = {
  method: 'POST',
  url: '...',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-ibm-client-secret': CLIENT_SECRET,
    'x-ibm-client-id': CLIENT_KEY
  },
  body: {
    text: '...'
  },
  json: true
};

const mla = (text, func, cb) => request(_.assign({}, options, {
  url: `https://api.eu.apiconnect.ibmcloud.com/g-cloud-dev/cognitive-apis/mla/1.0.2/${func}`,
  body: {
    text
  }
}), (error, response, body) => {
  if (error) return console.error('Failed: %s', error.message);

  try {
    expect(body).to.have.property('metadata');
  } catch (ex) {
    !PARALLEL && console.log(`Error ${ex.message} ...`) || console.log('Error');
  }

  if (MAX_CALLS <= 10 && !PARALLEL) {
    try {
      console.log(JSON.stringify(body, null, 2));
    } catch (ex) {
      console.log(body);
    }
  }

  cb();
});

const call = (index = 0, func = 0, calls = 0) => {
  const next = () => {
    MAX_CALLS <= 100 && !PARALLEL && console.log(`Pause for ${PAUSE}s ...`);
    setTimeout(() => call((index + 1) % SAMPLES.length, (func + 1) % FUNCS.length, calls + 1), PAUSE * 1000);
  };

  MAX_CALLS <= 100 && !PARALLEL && console.log(`Call ${FILES[index]} on ${FUNCS[func]} ...`);

  mla(SAMPLES[index], FUNCS[func], () => {
    if (calls < MAX_CALLS && !PARALLEL) next();
    if (PARALLEL && calls === MAX_CALLS * 1) console.log("Done.");
  });

  calls < MAX_CALLS && PARALLEL && next();
};

console.log(`Running ${MAX_CALLS} tests ...${PARALLEL && ' in parallel mode' || ''}`);
call();
