import Restaurant from './restaurant.js';
import {
    setLoading
} from './lib/loadingIndicator.js';

$(document).ready(() => {
    $('button[type=submit]').click(() => setLoading(true));

    // Place JavaScript code here...
    var foursquare_client_id = 'SRORFR3CHMAKXPPCIF5XD2KEZJXAPYCS4D0CH3TZ4WFQ50N2';
    var foursquare_client_secret = '1FUFIB113VVEDYVTZENGIA3I0ON2ZIRR2QEQ3V1IL5PAFH4F';
    var category_id = '4d4b7105d754a06374d81259';
    var lat = '40.7484';
    var long = '-73.9857';
    var restaurantsList = [];

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + mm + dd;
    getRestaurantsFromLatLong();

    function getRestaurantsFromLatLong(latitude = '39.09973', longitude = '-94.57857', radius = 25000) {
        console.log("Retrieving Restaurants List from FourSquare");
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            var comma = ','
            var ll = latitude.concat(comma, longitude);
            xhr.onload = event => {
                if (xhr.status !== 200) {
                    reject(xhr.status);
                }
                const response = JSON.parse(xhr.responseText);
                resolve(response);
                //console.log(response.response.venues);
                //console.log(response.response.venues.id);
                for (var i = 0; i < response.response.venues.length; i++) {
                    var restaurant = new Restaurant(response.response.venues[i].id, response.response.venues[i].name, response.response.venues[i].location.formattedAddress)
                    restaurantsList.push(restaurant);
                    getRestaurantsDetails(restaurant);
                    //console.log(restaurant);
                }
                console.log("Retrieved Restaurants List");
                //getRestaurantsDetails();
            };
            var URL = "https://api.foursquare.com/v2/venues/search?" + "ll=" + ll +
                "&client_id=" + foursquare_client_id + "&client_secret=" + foursquare_client_secret +
                "&categoryId=" + category_id +
                "&radius" + radius + "&v=" + today;

            xhr.open("GET", URL, true);
            xhr.send();
        });
    }

    function getRestaurantsDetails(restaurant) {
        console.log("Retrieving Restaurant details from FourSquare for restaurant: " + restaurant.restaurantId);
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = event => {
                if (xhr.status !== 200) {
                    reject(xhr.status);
                }
                const response = JSON.parse(xhr.responseText);
                resolve(response);
                //console.log(response);
                var commentsList = [];

                restaurant.rating = response.response.venue.rating;
                //console.log("Restaurant Rating: " + restaurant.rating);

                restaurant.restaurantLikes = response.response.venue.likes.count;
                //console.log("Restaurant Likes: " + restaurant.restaurantLikes);

                restaurant.restaurantVisitsCount = response.response.venue.stats.visitsCount;
                //console.log("Restaurant Visits Count: " + restaurant.restaurantVisitsCount);

                //console.log(response.response.venues);
                //console.log(response.response.venues.id);
                for (var j = 0; j < response.response.venue.tips.groups.length; j++) {
                    for (var k = 0; k < response.response.venue.tips.groups[j].items.length; k++) {
                        commentsList.push(response.response.venue.tips.groups[j].items[k].text)
                    }
                }
                restaurant.commentsList = commentsList;
                //console.log(restaurant.commentsList);
                console.log("Retrieved Restaurant details from FourSquare for restaurant: " + restaurant.restaurantId);
            };
            var URL = "https://api.foursquare.com/v2/venues/" + restaurant.restaurantId + "?" +
                "&client_id=" + foursquare_client_id + "&client_secret=" + foursquare_client_secret + "&v=" + today;
            //console.log(URL);
            xhr.open("GET", URL, true);
            xhr.send();
        });
    }
    function restaurantKey(name, zip) {
        var key = name.replace(/ /g, '') + zip;
        return key;
    }
});
