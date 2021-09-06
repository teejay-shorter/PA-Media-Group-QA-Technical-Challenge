import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('https://www.metaweather.com/api/');

var locationsJSON = require('../location_names.json');
export class Helpers {
	constructor() {}

	getTomorrowsDate(currentDate) {
		/*
        Returns tomorrow's date in the following format:
        "YYYY/MM//DD"

        Params:
        - currentDate: Date()
            e.g. "Sat Sep 04 2021 16:44:36 GMT+0100 (British Summer Time)"
    */
		let tomorrowsDate = new Date(currentDate);
		tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
		return tomorrowsDate;
	}

	getFormattedDate(date) {
		/*
        Returns date in the following format:
        "YYYY/MM//DD"

        Params:
        - date: Date()
            e.g. "Sat Sep 04 2021 16:44:36 GMT+0100 (British Summer Time)"
    */
		let formattedDate = new Intl.DateTimeFormat('ja-JP').format(date);
		return formattedDate;
	}

	getRandomLocation() {
		/*
        Returns a random location from the list of accepted search terms:
        "London"
    */
		const locationList = locationsJSON;
		let locationIndex = Math.floor(
			Math.random() * locationList.location.length
		);
		return locationList.location[locationIndex];
	}

	async getWoeId(locationName) {
		/*
        Returns the WoeId from the API depending on the location entered:
        "30720"

        Params:
        - locationName: String()
            e.g. "Nottingham"
    */
		const res = await request.get(`location/search/?query=${locationName}`);
		return res.body[0].woeid;
	}
}
