/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import config from '../../config';
import chai from '../../../test/chai';
import { expect } from 'chai';
import server from '../../../build/server';

import { FEHLER_ID } from './index';

const url = config.get('RGF_MODUL.URL');

describe('RGF Mock', () => {
  it('... antwortet mit Glasdaten beim laden eines beliebigen Auftrags', (done) => {
    const auftragId = '12345';

    chai.request(server)
      .post(`${url}/orders/load`)
      .send({
        auftragId
      })
      .end((err, res) => {
        expect(res.body.auftragId).to.equal(auftragId);
        expect(res.body.glasdaten).to.be.defined;
        done();
      });
  });

  it(`... antwortet mit einem Fehler beim Laden des Auftrags ${FEHLER_ID}`, (done) => {
    chai.request(server)
      .post(`${url}/orders/load`)
      .send({
        auftragId: FEHLER_ID
      })
      .end((err, res) => {
        expect(res.body.auftragId).to.equal(FEHLER_ID);
        expect(res.body.error).to.be.defined;
        done();
      });
  });

  it('... antwortet mit Auftragsdaten beim Speichern eines Auftrags', (done) => {
    const auftragId = '12345';

    chai.request(server)
      .post(`${url}/orders/save`)
      .send({
        auftragId
      })
      .end((err, res) => {
        expect(res.body.auftragId).to.equal(auftragId);
        expect(res.body.glasdaten).to.be.defined;
        done();
      });
  });

  it(`... antwortet mit einem Fehler beim Speichern des Auftrags ${FEHLER_ID}`, (done) => {
    chai.request(server)
      .post(`${url}/orders/save`)
      .send({
        auftragId: FEHLER_ID
      })
      .end((err, res) => {
        expect(res.body.auftragId).to.equal(FEHLER_ID);
        expect(res.body.error).to.be.defined;
        done();
      });
  });
});
