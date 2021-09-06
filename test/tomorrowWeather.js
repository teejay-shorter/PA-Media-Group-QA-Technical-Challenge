import supertest from 'supertest';
import { expect } from 'chai';
import { Helpers } from './Useful Functions/functions';

const request = supertest('https://www.metaweather.com/api/');

const woeId = 30720;
const todaysDate = new Date();

describe('Location Day Search', () => {
	it("Search Tomorrow's Date in 'Nottingham'", (done) => {
		let tomorrowsDate = new Helpers().getTomorrowsDate(todaysDate);
		let formattedDate = new Helpers().getFormattedDate(tomorrowsDate);
		request.get(`location/${woeId}/${formattedDate}/`).end((err, res) => {
			expect(res.status).to.eql(200);
			expect(res.body).to.not.be.null;
			expect(res.body[0].applicable_date).eql(
				new Intl.DateTimeFormat('se-SE').format(tomorrowsDate)
			);
			done();
		});
	});

	it("Search Today's Date in 'Nottingham'", (done) => {
		let formattedDate = new Helpers().getFormattedDate(todaysDate);
		request.get(`location/${woeId}/${formattedDate}/`).end((err, res) => {
			expect(res.status).to.eql(200);
			expect(res.body).to.not.be.null;
			expect(res.body[0].applicable_date).eql(
				new Intl.DateTimeFormat('se-SE').format(todaysDate)
			);
			done();
		});
	});
});
