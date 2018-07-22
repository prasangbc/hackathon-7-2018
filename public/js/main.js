import getFourSquareReviews from './lib/foursquare_api.js';
import { restaurantsList as fourSquareRestaurantList } from './lib/foursquare_api.js'
import retrieveMentionedComments from './lib/secretSauce.js';

import {
    getLatLng,
    getRestaurantsFromGoogle
} from './lib/google.js';
import { restaurantsList as googleRestaurantsList } from './lib/google.js';
import {
    setLoading
} from './lib/loadingIndicator.js';

const zipCode = 66210;
const dish = 'biryani';
const radius = 25000;

$(document).ready(() => {
    $('button[type=submit]').click(() => setLoading(true));

    var latitude, longitude;
    getLatLng(zipCode)
        .then(response => response.json())
        .then((response) => {
            latitude = response.json.results[0].geometry.location.lat;
            longitude = response.json.results[0].geometry.location.lng;
            return response.json.results[0].geometry.location;
        })
        .then(() => {
            getFourSquareReviews(latitude, longitude, radius).then(()=>{retrieveMentionedComments(fourSquareRestaurantList,dish)});
            getRestaurantsFromGoogle(dish, latitude, longitude, radius, zipCode).then(()=>{retrieveMentionedComments(googleRestaurantsList,dish)});
        }).catch((error) => {
            console.error(error);
        });
});
