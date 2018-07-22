import restaurantKey from './common.js';
import Restaurant from './restaurant.js';

var restaurantsList = [];

function getLatLng(zipcode = 66210) {
    return fetch("/geocode?" + "zipcode=" + zipcode);
}

function getRestaurantsFromGoogle(query = 'biriyani', lat = '39.09973', lng = '-94.57857', radius = 25000, zipCode = 66210) {
    var URL = "/places?" + "query=" + query +
            "&type=restaurant" + "&radius=" + radius + "&lat=" + lat + "&lng=" + lng;
    return fetch(URL)
      .then((response) => response.json())
      .then(response => {
        var restaurants = response.json.results;
        var promises = [];
        for (var i = 0; i < restaurants.length; i++) {
            var restrantWTFId = restaurantKey(restaurants[i].name, zipCode);
            var restaurant = new Restaurant(restrantWTFId, "GOOGLE", restaurants[i].place_id, restaurants[i].name, restaurants[i].formatted_address);
            restaurant.rating = restaurants[i].rating;
            restaurantsList.push(restaurant);
            promises.push(getRestaurantFromGoogle(restaurant));
        }
        return Promise.all(promises);
      });
}

function getRestaurantFromGoogle(restaurant) {
    var URL = "/place?" + "placeid=" + restaurant.sourceIdentifiers["GOOGLE"] + "&field=review";
    return fetch(URL)
        .then(response => response.json())
        .then(response => {
            var commentsList = [];
            var reviews = response.json.result.reviews;
            for (var i = 0; i < reviews.length; i++) {
                commentsList.push(reviews[i].text);
            }
            restaurant.comments = commentsList;
            return Promise.resolve();
        });
}

export {
    getLatLng,
    getRestaurantsFromGoogle
}
export { restaurantsList }
