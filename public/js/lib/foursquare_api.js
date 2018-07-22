    import restaurantKey from './common.js';
    import Restaurant from './restaurant.js';

    var foursquare_client_id = 'SRORFR3CHMAKXPPCIF5XD2KEZJXAPYCS4D0CH3TZ4WFQ50N2';
    var foursquare_client_secret = '1FUFIB113VVEDYVTZENGIA3I0ON2ZIRR2QEQ3V1IL5PAFH4F';
    var category_id = '4d4b7105d754a06374d81259';
    // var lat = '40.7484';
    // var long = '-73.9857';
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
        //return new Promise((resolve, reject) => {
        //const xhr = new XMLHttpRequest();

        var comma = ','
        var ll = latitude.concat(comma, longitude);
        //xhr.onload = event => {
        //    if (xhr.status !== 200) {
        //        reject(xhr.status);
        //    }
        //    const response = JSON.parse(xhr.responseText);

        //console.log(response.response.venues);
        //console.log(response.response.venues.id);
        // var promises = [];
        // for (var i = 0; i < response.response.venues.length; i++) {
        //     var zipCode = response.response.venues[i].location.postalCode;
        //     var restaurantWTFId = restaurantKey(response.response.venues[i].name, zipCode);
        //     var restaurant = new Restaurant(restaurantWTFId, "FOURSQUARE", response.response.venues[i].id, response.response.venues[i].name, response.response.venues[i].location.formattedAddress);
        //     restaurantsList.push(restaurant);
        //     promises.push(getRestaurantsDetails(restaurant));
        //     //promises.push(getRestaurantMenu(restaurant));
        //     //resolve(response);
        //     // getRestaurantsDetails(restaurant).then(() => {
        //     //     var rest = [];
        //     //     rest = retrieveMentionedComments(restaurantsList, "pasta");
        //     //     console.log(rest);
        //     //     console.log("Retrieved Restaurants Details from FourSquare");
        //     // });

        //     //console.log(restaurant);
        // }
        // console.log("Retrieved Restaurants Details from FourSquare");
        // return Promise.all(promises);

        //getRestaurantsDetails();
        //};
        var URL = "https://api.foursquare.com/v2/venues/search?" + "ll=" + ll +
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
                //promises.push(getRestaurantMenu(restaurant));
                //resolve(response);
                // getRestaurantsDetails(restaurant).then(() => {
                //     var rest = [];
                //     rest = retrieveMentionedComments(restaurantsList, "pasta");
                //     console.log(rest);
                //     console.log("Retrieved Restaurants Details from FourSquare");
                // });

                //console.log(restaurant);
            }
            console.log("Retrieved Restaurants Details from FourSquare");
            return Promise.all(promises);
            //return Promise.resolve();
        });

        //xhr.open("GET", URL, true);
        //xhr.send();
        //});
    }

    function getRestaurantsDetails(restaurant) {
        //console.log("Retrieving Restaurant details from FourSquare for restaurant: " + restaurant.sourceIdentifiers["FOURSQUARE"]);
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            //xhr.onload = event => {
            //    if (xhr.status !== 200) {
            //        reject(xhr.status);
            //    }
            // const response = JSON.parse(xhr.responseText);

            // //console.log(response);
            // var commentsList = [];

            // restaurant.rating = response.response.venue.rating;
            // //console.log("Restaurant Rating: " + restaurant.rating);

            // restaurant.likes = response.response.venue.likes.count;
            // //console.log("Restaurant Likes: " + restaurant.restaurantLikes);

            // restaurant.visitsCount = response.response.venue.stats.visitsCount;
            // //console.log("Restaurant Visits Count: " + restaurant.restaurantVisitsCount);

            // //console.log(response.response.venues);
            // //console.log(response.response.venues.id);
            // for (var j = 0; j < response.response.venue.tips.groups.length; j++) {
            //     for (var k = 0; k < response.response.venue.tips.groups[j].items.length; k++) {
            //         commentsList.push(response.response.venue.tips.groups[j].items[k].text);
            //     }
            // }
            // restaurant.comments = commentsList;
            //resolve(response);
            //console.log(restaurant.commentsList);
            //console.log("Retrieved Restaurant details from FourSquare for restaurant: " + restaurant.sourceIdentifiers["FOURSQUARE"]);
            //};
            var URL = "https://api.foursquare.com/v2/venues/" + restaurant.sourceIdentifiers["FOURSQUARE"] + "?" +
                "&client_id=" + foursquare_client_id + "&client_secret=" + foursquare_client_secret + "&v=" + today;
            //console.log(URL);
            //xhr.open("GET", URL, true);
            //xhr.send();
            return fetch(URL).then((response) => {
                return response.json();
            }).then((response) => {
                //const response = JSON.parse(responseText);
                //const response = responseText.json();

                //console.log(response);
                var commentsList = [];

                restaurant.rating = response.response.venue.rating;
                //console.log("Restaurant Rating: " + restaurant.rating);

                restaurant.likes = response.response.venue.likes.count;
                //console.log("Restaurant Likes: " + restaurant.restaurantLikes);

                restaurant.visitsCount = response.response.venue.stats.visitsCount;
                //console.log("Restaurant Visits Count: " + restaurant.restaurantVisitsCount);

                //console.log(response.response.venues);
                //console.log(response.response.venues.id);
                for (var j = 0; j < response.response.venue.tips.groups.length; j++) {
                    for (var k = 0; k < response.response.venue.tips.groups[j].items.length; k++) {
                        commentsList.push(response.response.venue.tips.groups[j].items[k].text);
                    }
                }
                restaurant.comments = commentsList;
                return Promise.resolve();
            });
        });
    }

    function getRestaurantMenu(restaurant) {
        //console.log("Retrieving Restaurant Menu from FourSquare for restaurant: " + restaurant.sourceIdentifiers["FOURSQUARE"]);
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = event => {
                if (xhr.status !== 200) {
                    reject(xhr.status);
                }
                const response = JSON.parse(xhr.responseText);

                //console.log(response);
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
                resolve(response);
                //console.log(restaurant.restaurantMenu);
                //console.log("Retrieved Restaurant Menu from FourSquare for restaurant: " + restaurant.sourceIdentifiers["FOURSQUARE"]);
            };
            var URL = "https://api.foursquare.com/v2/venues/" + restaurant.sourceIdentifiers["FOURSQUARE"] + "/menu?" +
                "&client_id=" + foursquare_client_id + "&client_secret=" + foursquare_client_secret + "&v=" + today;
            //console.log(URL);
            xhr.open("GET", URL, true);
            xhr.send();
        });
    }

    export default getFourSquareReviews
    export { restaurantsList }