import getFourSquareReviews, { getFourSquareReviewsByQuery } from './lib/foursquare_api.js';
import { restaurantsList as fourSquareRestaurantList } from './lib/foursquare_api.js'
import retrieveMentionedComments from './lib/secretSauce.js';
import {
    registerSubmitHandler,
    updateResults,
    registerInputChangeHandlers,
    registerModalHandlers
 } from './lib/eventHandlers.js'
import {
    getLatLng,
    getRestaurantsFromGoogle,
    getRestaurantsFromGoogleWithoutQuery
} from './lib/google.js';
import { restaurantsList as googleRestaurantsList } from './lib/google.js';
import {
    getKeywords,
    getZipCode
} from './lib/input.js'

// const zipCode = 66210;
// const dish = 'haleem';
const radius = 250000;

const fetchResults = () => {
    $('#results').empty();

    const dish = getKeywords();
    const zipCode = getZipCode();
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
            getRestaurantsFromGoogleWithoutQuery(latitude, longitude, radius, zipCode)
                .then(() => {
                    retrieveMentionedComments(googleRestaurantsList, dish)
                    updateResults()
                });
        }).catch((error) => {
            console.error(error);
        });
};

$(document).ready(() => {
    registerSubmitHandler('button[type=submit]', fetchResults);
    registerInputChangeHandlers();
    registerModalHandlers();
});
