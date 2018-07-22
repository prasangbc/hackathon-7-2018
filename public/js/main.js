import getFourSquareReviews from './lib/foursquare_api.js';
import { restaurantsList as fourSquareRestaurantList } from './lib/foursquare_api.js'
import retrieveMentionedComments from './secretSauce.js';

import {
    setLoading
} from './lib/loadingIndicator.js';

$(document).ready(() => {
    $('button[type=submit]').click(() => setLoading(true));

    // Place JavaScript code here...
    getFourSquareReviews().then(() => {
        var rest = [];
        rest = retrieveMentionedComments(fourSquareRestaurantList, "pasta");
        console.log(rest);
        console.log("Retrieved Restaurants Details from FourSquare");
    }).catch((error) => {
        console.error(error);
    });
});