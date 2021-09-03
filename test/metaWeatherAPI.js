import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('https://www.metaweather.com/api/');

const searchTerm = 'london';

describe('Location Search', () => {
  it('GET /location/search', (done) => {
    request
      .get(`location/search/?query=${searchTerm}`)
      .end((err, res) => {
        console.log(err);
          console.log(res.body);
          expect(res.body.data).to.be.empty;
          done();
      });
  });
});