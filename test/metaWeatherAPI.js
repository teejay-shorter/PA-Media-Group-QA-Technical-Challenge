import supertest from 'supertest';
import { expect } from 'chai';
import { Helpers } from './Useful Functions/functions';
var locationsJSON = require('./location_names.json');

const request = supertest('https://www.metaweather.com/api/');

const helpersObj = new Helpers();
const woeId = 30720;
const todaysDate = new Date();
const searchTerm = locationsJSON;
const latt = 51.51118596406264;
const long = -0.09245489715344737;

describe('Location Search', () => {
	describe('GET /location/search/?query=(query)', () => {
		it('Check Location Search - Valid query location', (done) => {
			request
				.get(`location/search/?query=${searchTerm.location[0]}`)
				.end((err, res) => {
					expect(res.body.data).to.not.be.null;
					done();
				});
		});
		it('Check Location Search - Valid random query location', (done) => {
			// Expansion on previous test to include testing different locations
			let search = helpersObj.getRandomLocation();
			request.get(`location/search/?query=${search}`).end((err, res) => {
				expect(res.body.data).to.not.be.null;
				done();
			});
		});
		it('Check Location Search - Returns woeId with Location', () => {
			// add test
		});
	});

	describe('GET /location/search/?lattlong=(latt),(long)', () => {
		it('Check Location Search - Valid coordinates location', (done) => {
			request
				.get(`location/search/?lattlong=${latt},${long}`)
				.end((err, res) => {
					expect(res.body.data).to.not.be.null;
					done();
				});
		});
	});
});
describe('Location', () => {
	describe('GET /location/(woeid)/', () => {
		it('Check Status 200 - Valid WoeId', async () => {
			const woeId = await helpersObj.getWoeId(helpersObj.getRandomLocation());
			const res = await request.get(`location/${woeId}/`);
			expect(res.status).to.eql(200);
		});
	});
});
describe('Location Day', () => {
	describe('GET /location/(woeid)/(date)/', () => {
		describe('Location Day - Check Response Types', () => {
			let responseObj = '';

			it('Get Response Keys', (done) => {
				let formattedDate = helpersObj.getFormattedDate(todaysDate);
				request.get(`location/${woeId}/${formattedDate}/`).end((err, res) => {
					const attributes = res.body[0];
					responseObj = res.body[0];
					expect(attributes).to.include.keys(
						'id',
						'applicable_date',
						'weather_state_name',
						'weather_state_abbr',
						'wind_speed',
						'wind_direction',
						'wind_direction_compass',
						'min_temp',
						'max_temp',
						'the_temp',
						'air_pressure',
						'humidity',
						'visibility',
						'predictability'
					);
					done();
				});
			});

			it('Check id is a Number', () => {
				expect(responseObj.id).to.be.a('number');
			});

			it('Check applicable_date is a String', () => {
				// Cannot check Date type
				expect(responseObj.applicable_date).to.be.a('string');
			});

			it('Check weather_state_name is a String', () => {
				expect(responseObj.weather_state_name).to.be.a('string');
			});

			it('Check weather_state_abbr is a String', () => {
				expect(responseObj.weather_state_abbr).to.be.a('string');
			});

			it('Check wind_speed is a Number', () => {
				// Cannot check Float type
				expect(responseObj.wind_speed).to.be.a('number');
			});

			it('Check wind_direction is a Number', () => {
				// Cannot check Float type
				expect(responseObj.wind_direction).to.be.a('number');
			});

			it('Check wind_direction_compass is a String', () => {
				expect(responseObj.wind_direction_compass).to.be.a('string');
			});

			it('Check min_temp is a Number', () => {
				// Cannot check Int type
				expect(responseObj.min_temp).to.be.a('number');
			});

			it('Check max_temp is a Number', () => {
				// Cannot check Int type
				expect(responseObj.max_temp).to.be.a('number');
			});

			it('Check the_temp is a Number', () => {
				// Cannot check Int type
				expect(responseObj.the_temp).to.be.a('number');
			});

			it('Check air_pressure is a Number', () => {
				// Cannot check Float type
				expect(responseObj.air_pressure).to.be.a('number');
			});

			it('Check humidity is a Number', () => {
				// Cannot check Float type
				expect(responseObj.humidity).to.be.a('number');
			});

			it('Check visibility is a Number', () => {
				// Cannot check Float type
				expect(responseObj.visibility).to.be.a('number');
			});

			it('Check predictability is a Number', () => {
				// Cannot check Int type
				expect(responseObj.predictability).to.be.a('number');
			});
		});
		describe('Location Day - Check Response Status', () => {
			it('Check Status 200 - Valid WoeId / Valid Date', (done) => {
				let formattedDate = helpersObj.getFormattedDate(todaysDate);
				request.get(`location/${woeId}/${formattedDate}/`).end((err, res) => {
					expect(res.status).to.eql(200);
					expect(res.body).to.not.be.null;
					done();
				});
			});

			it('Check Status 404 - Invalid WoeId / Valid Date', (done) => {
				let invalidWoeId = 9999;
				let formattedDate = helpersObj.getFormattedDate(todaysDate);
				request
					.get(`location/${invalidWoeId}/${formattedDate}/`)
					.end((err, res) => {
						expect(res.status).to.eql(404);
						expect(res.body).to.eql({
							detail: 'Not found.',
						});
						done();
					});
			});

			it('Check Status 500 - Valid WoeId / Invalid Date', (done) => {
				let invalidDate = '2021/2/29';
				request.get(`location/${woeId}/${invalidDate}/`).end((err, res) => {
					expect(res.status).to.eql(500);
					expect(res.body).to.not.be.null;
					done();
				});
			});

			it('Check Status 404 - Invalid WoeId / Invalid Date', (done) => {
				let invalidWoeId = 9999;
				let invalidDate = '2021/2/29';
				request
					.get(`location/${invalidWoeId}/${invalidDate}/`)
					.end((err, res) => {
						expect(res.status).to.eql(404);
						expect(res.body).to.eql({
							detail: 'Not found.',
						});
						done();
					});
			});

			it('Check Status 404 - Valid WoeId / Invalid Date Format', (done) => {
				let invalidDate = '29-05-2021';
				request.get(`location/${woeId}/${invalidDate}/`).end((err, res) => {
					expect(res.status).to.eql(404);
					expect(res.body).to.be.empty;
					done();
				});
			});
		});
	});
});
