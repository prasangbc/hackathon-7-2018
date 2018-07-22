import restaurantKey from './common.js';
import Restaurant from './restaurant.js';

var restaurantsList = [];

function getLatLng(zipcode = 66210) {
    //console.log("Get latitude and longitude for zipcode: " + zipcode);
    return new Promise((resolve, reject) => {
        const latlngRequest = new XMLHttpRequest();
        latlngRequest.onload = event => {
            if (latlngRequest.status !== 200) {
                reject(latlngRequest.status);
            }
            const response = JSON.parse(latlngRequest.responseText);
            //console.log(response.json.results[0].geometry.location);
            resolve(response);
        }
        var URL = "/geocode?" + "zipcode=" + zipcode;
        latlngRequest.open("GET", URL, true);
        latlngRequest.send();
    });
    return fetch("/geocode?" + "zipcode=" + zipcode);
}

function getRestaurantsFromGoogle(query = 'biriyani', lat = '39.09973', lng = '-94.57857', radius = 25000, zipCode = 66210) {
    //console.log("Get Restaurants from Google for lat: " + lat + "lng: " + lng);
    return new Promise((resolve, reject) => {
        const getRestaurantsFrmGoog = new XMLHttpRequest();
        getRestaurantsFrmGoog.onload = event => {
            if (getRestaurantsFrmGoog.status !== 200) {
                reject(getRestaurantsFrmGoog.status);
            }
            const response = JSON.parse(getRestaurantsFrmGoog.responseText);
            var restaurants = response.json.results;
            for (var i = 0; i < restaurants.length; i++) {
                var restrantWTFId = restaurantKey(restaurants[i].name, zipCode);
                var restaurant = new Restaurant(restrantWTFId, "GOOGLE", restaurants[i].place_id, restaurants[i].name, restaurants[i].formatted_address);
                restaurant.rating = restaurants[i].rating;
                restaurantsList.push(restaurant);
                getRestaurantFromGoogle(restaurant);
            }
            resolve(response);
        }
        var URL = "/places?" + "query=" + query +
            "&type=restaurant" + "&radius=" + radius + "&lat=" + lat + "&lng=" + lng;
        getRestaurantsFrmGoog.open("GET", URL, true);
        getRestaurantsFrmGoog.send();
    });
}

function getRestaurantFromGoogle(restaurant) {
    //console.log("Enter Get Restaurant of Id:" + restaurant.sourceIdentifiers["GOOGLE"]);
    return new Promise((resolve, reject) => {
        const getRestaurantFrmGoog = new XMLHttpRequest();
        getRestaurantFrmGoog.onload = event => {
            if (getRestaurantFrmGoog.status !== 200) {
                reject(getRestaurantFrmGoog.status);
            }
            const response = JSON.parse(getRestaurantFrmGoog.responseText);
            var commentsList = [];
            var reviews = response.json.result.reviews;
            for (var i = 0; i < reviews.length; i++) {
                commentsList.push(reviews[i].text);
            }
            restaurant.comments = commentsList;
            //console.log(response.json.result.reviews);
            //console.log(restaurant)
            resolve(response);
        }
        var URL = "/place?" + "placeid=" + restaurant.sourceIdentifiers["GOOGLE"] + "&field=review";
        getRestaurantFrmGoog.open("GET", URL, true);
        getRestaurantFrmGoog.send();
    });
    //console.log("Exit Get Restaurant of Id:" + place);
}

// window.getLatLng = getLatLng
// window.getRestaurantFromGoogle = getRestaurantFromGoogle
// window.getRestaurantsFromGoogle = getRestaurantsFromGoogle
export {
    getLatLng,
    getRestaurantsFromGoogle
}
export { restaurantsList }