import getRestaurantsFromLatLong from './lib/foursquare_api.js';

import {
    setLoading
} from './lib/loadingIndicator.js';

$(document).ready(() => {
    $('button[type=submit]').click(() => setLoading(true));

    // Place JavaScript code here...
    getRestaurantsFromLatLong();
});