import getFourSquareReviews from './lib/foursquare_api.js';
import { restaurantsList as fourSquareRestaurantList } from './lib/foursquare_api.js'
import retrieveMentionedComments from './lib/secretSauce.js';

import {
    getLatLng,
    getRestrauntFromGoogle,
    getRestrauntsFromGoogle
} from './lib/google.js';
import {
    setLoading
} from './lib/loadingIndicator.js';

$(document).ready(() => {
    $('button[type=submit]').click(() => setLoading(true));

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    var latitude, longitude;
    getLatLng(66210)
    .then((response) => {
            latitude = laresponse.json.results[0].geometry.location.lat;
            longitude = laresponse.json.results[0].geometry.location.lng;
            return response.json.results[0].geometry.location;})
    .then((latlng) => {
<<<<<<< Updated upstream
    getFourSquareReviews().then(() => {
        var rest = [];
        rest = retrieveMentionedComments(fourSquareRestaurantList, "pasta");
        console.log(rest);
        console.log("Retrieved Restaurants Details from FourSquare");
    }).catch((error) => {
        console.error(error);
=======
    getRestaurantsFromLatLong();
>>>>>>> Stashed changes
    });
}
