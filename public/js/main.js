import getFourSquareReviews, { getFourSquareReviewsByQuery } from './lib/foursquare_api.js';
import { restaurantsList as fourSquareRestaurantList } from './lib/foursquare_api.js'
import retrieveMentionedComments from './lib/secretSauce.js';
import {
    registerSubmitHandler,
    updateResults
} from './lib/eventHandlers.js'
import {
    getLatLng,
    getRestaurantsFromGoogle
} from './lib/google.js';
import { restaurantsList as googleRestaurantsList } from './lib/google.js';

const zipCode = 66210;
const dish = 'biryani';
const radius = 250000;

const fetchResults = (dish, zipCode) => {
    return getLatLng(zipCode)
        .then(response => response.json())
        .then((response) => response.json.results[0].geometry.location)
        .then(({ latitude, longitude }) => {
            getFourSquareReviews(latitude, longitude, radius)
                .then(() => {
                    retrieveMentionedComments(fourSquareRestaurantList, dish)
                    updateResults()
                });
            getFourSquareReviewsByQuery(latitude, longitude, radius, dish)
                .then(() => {
                    retrieveMentionedComments(fourSquareRestaurantList, dish)
                    updateResults()
                });
            getRestaurantsFromGoogle(dish, latitude, longitude, radius, zipCode)
                .then(() => {
                    retrieveMentionedComments(googleRestaurantsList, dish)
                    updateResults()
                });
        }).catch((error) => {
            console.error(error);
        });
};

$(document).ready(() => {
    registerSubmitHandler(() => fetchResults(dish, zipCode));
});