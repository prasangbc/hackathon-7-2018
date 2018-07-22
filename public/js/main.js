import getFourSquareReviews from './lib/foursquare_api.js';
import { restrauntsList as fourSquareRestaurantList } from './lib/foursquare_api.js'
import retrieveMentionedComments from './lib/secretSauce.js';

import {
    getLatLng,
    getRestrauntsFromGoogle
} from './lib/google.js';
import { restrauntsList as googleRestrauntsList } from './lib/google.js';
import {
    setLoading
} from './lib/loadingIndicator.js';

const zipCode = 66210;
const dish = 'biriyani';
const radius = 25000;

$(document).ready(() => {
    $('button[type=submit]').click(() => setLoading(true));

    var latitude, longitude;
    getLatLng(zipCode)
        .then((response) => {
            latitude = response.json.results[0].geometry.location.lat;
            longitude = response.json.results[0].geometry.location.lng;
            return response.json.results[0].geometry.location;
        })
        .then((latlng) => {
            getFourSquareReviews(latitude, longitude, radius);
            getRestrauntsFromGoogle(dish, latitude, longitude, radius, zipCode)
        })
        .then((response) => {
            var rest = [];
            rest = retrieveMentionedComments(fourSquareRestaurantList, dish);
            rest = retrieveMentionedComments(googleRestrauntsList, dish);
            console.log(rest);
            console.log("Retrieved Restaurants Details from FourSquare");
        }).catch((error) => {
            console.error(error);
        });
});