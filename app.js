import request from 'request';

const CLIENT_KEY = process.env.CLIENT_KEY || process.argv[2] || 'REPLACE_THIS_KEY';
const CLIENT_SECRET = process.env.CLIENT_SECRET || process.argv[3] || 'REPLACE_THIS_KEY';

const options = {
  method: 'POST',
  url: 'https://api.eu.apiconnect.ibmcloud.com/g-cloud-dev/cognitive-apis/unmut/1.0.2/analysis/text',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-ibm-client-secret': CLIENT_SECRET,
    'x-ibm-client-id': CLIENT_KEY
  },
  body: {
    text: 'Damit bin ich überhaupt nicht zufrieden!'
  },
  json: true
};

console.log('Request API with options:')
console.log(JSON.stringify(options, null, 2));
console.log();

request(options, function(error, response, body) {
  if (error) return console.error('Failed: %s', error.message);

  console.log('Received response:');

  try {
    console.log(JSON.stringify(body, null, 2));
  } catch (ex) {
    console.log(body);
  }
});
