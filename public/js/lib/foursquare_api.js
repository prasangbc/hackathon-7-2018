    import restaurantKey from './common.js';
    import Restaurant from './restaurant.js';

    var foursquare_client_id = 'SRORFR3CHMAKXPPCIF5XD2KEZJXAPYCS4D0CH3TZ4WFQ50N2';
    var foursquare_client_secret = '1FUFIB113VVEDYVTZENGIA3I0ON2ZIRR2QEQ3V1IL5PAFH4F';
    var category_id = '4d4b7105d754a06374d81259';
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

    function getFourSquareReviews(latitude = '39.09973', longitude = '-94.57857', radius = 25000) {
        console.log("Retrieving Restaurants Details from FourSquare");

        var comma = ','
        var ll = latitude + comma + longitude;
        var URL = "https://api.foursquare.com/v2/venues/search?" + "ll=" + ll + "&limit=" + "50" +
            "&client_id=" + foursquare_client_id + "&client_secret=" + foursquare_client_secret +
            "&categoryId=" + category_id +
            "&radius" + radius + "&v=" + today;
        return fetch(URL).then((response) => {
            return response.json();
        }).then((response) => {
            var promises = [];
            for (var i = 0; i < response.response.venues.length; i++) {
                var zipCode = response.response.venues[i].location.postalCode;
                var restaurantWTFId = restaurantKey(response.response.venues[i].name, zipCode);
                var restaurant = new Restaurant(restaurantWTFId, "FOURSQUARE", response.response.venues[i].id, response.response.venues[i].name, response.response.venues[i].location.formattedAddress);
                restaurantsList.push(restaurant);
                promises.push(getRestaurantsDetails(restaurant));
                promises.push(getRestaurantMenu(restaurant));
            }
            console.log("Retrieved Restaurants Details from FourSquare");
            return Promise.all(promises);
        });
    }

    function getFourSquareReviewsByQuery(latitude = '39.09973', longitude = '-94.57857', radius = 25000, query = 'burger') {
        console.log("Retrieving Restaurants Details By Query from FourSquare");

        var comma = ','
        var ll = latitude + comma + longitude;
        var URL = "https://api.foursquare.com/v2/venues/explore?" + "ll=" + ll + "&query=" + query + "&limit=" + "50" +
            "&client_id=" + foursquare_client_id + "&client_secret=" + foursquare_client_secret +
            "&radius" + radius + "&v=" + today;
        console.log(URL);
        return fetch(URL).then((response) => {
            return response.json();
        }).then((response) => {
            var promises = [];
            for (var i = 0; i < response.response.groups.length; i++) {
                for (var j = 0; j < response.response.groups[i].items.length; j++) {
                    var zipCode = response.response.groups[i].items[j].venue.location.postalCode;
                    var restaurantWTFId = restaurantKey(response.response.groups[i].items[j].venue.name, zipCode);
                    var restaurant = new Restaurant(restaurantWTFId, "FOURSQUARE", response.response.groups[i].items[j].venue.id, response.response.groups[i].items[j].venue.name, response.response.groups[i].items[j].venue.location.formattedAddress);
                    restaurantsList.push(restaurant);
                    promises.push(getRestaurantsDetails(restaurant));
                    promises.push(getRestaurantMenu(restaurant));
                }

            }
            //console.log(restaurantsList);
            console.log("Retrieved Restaurants Details By Query from FourSquare");
            return Promise.all(promises);
        });
    }

    function getRestaurantsDetails(restaurant) {
        var URL = "https://api.foursquare.com/v2/venues/" + restaurant.sourceIdentifiers["FOURSQUARE"] + "?" +
            "&client_id=" + foursquare_client_id + "&client_secret=" + foursquare_client_secret + "&v=" + today;
        return fetch(URL).then((response) => {
            return response.json();
        }).then((response) => {
            var commentsList = [];

            restaurant.rating = response.response.venue.rating;
            //console.log("Restaurant Rating: " + restaurant.rating);

            restaurant.likes = response.response.venue.likes.count;
            //console.log("Restaurant Likes: " + restaurant.restaurantLikes);

            restaurant.visitsCount = response.response.venue.stats.visitsCount;
            //console.log("Restaurant Visits Count: " + restaurant.restaurantVisitsCount);

            restaurant.lat = response.response.venue.location.lat;

            restaurant.long = response.response.venue.location.lng;


            for (var j = 0; j < response.response.venue.tips.groups.length; j++) {
                for (var k = 0; k < response.response.venue.tips.groups[j].items.length; k++) {
                    commentsList.push(response.response.venue.tips.groups[j].items[k].text);
                }
            }
            restaurant.comments = commentsList;
            return Promise.resolve();
        });
    }

    function getRestaurantMenu(restaurant) {
        var URL = "https://api.foursquare.com/v2/venues/" + restaurant.sourceIdentifiers["FOURSQUARE"] + "/menu?" +
            "&client_id=" + foursquare_client_id + "&client_secret=" + foursquare_client_secret + "&v=" + today;
        return fetch(URL).then((response) => {
            return response.json();
        }).then((response) => {
            var menuItems = [];
            var hasMenu = false;
            if (response.response.menu.menus.count !== 0) {
                for (var l = 0; l < response.response.menu.menus.items.length; l++) {
                    for (var m = 0; m < response.response.menu.menus.items[l].entries.items.length; m++) {
                        for (var n = 0; n < response.response.menu.menus.items[l].entries.items[m].entries.items.length; n++) {
                            menuItems.push(response.response.menu.menus.items[l].entries.items[m].entries.items[n].name);
                            hasMenu = true;
                        }
                    }
                }
            }
            if (hasMenu == true) {
                restaurant.hasMenu = true;
            }
            restaurant.menu = menuItems;
            return Promise.resolve();
        });
    }

    export default getFourSquareReviews
    export { getFourSquareReviewsByQuery }
    export { restaurantsList }