import Restaurant from './restaurant.js';

$(document).ready(() => {

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
                    //getRestaurantsDetails(restaurant);
                    //console.log(restaurant);
                }
                console.log("Retrieved Restaurants List");
                //getRestaurantsDetails();
            };
            var URL = "https://api.foursquare.com/v2/venues/search?" + "ll=" + ll +
                "&client_id=" + foursquare_client_id + "&client_secret=" + foursquare_client_secret +
                "&categoryId=" + category_id +
                "&radius" + radius + "&v=" + today;

            //document.write(URL);
            // xhr.open("GET",
            //     `https://api.foursquare.com/v2/venues/search?`, true);
            // xhr.setRequestHeader("ll", ll);
            // xhr.setRequestHeader("client_id", foursquare_client_id);
            // xhr.setRequestHeader("client_secret", foursquare_client_secret);
            // xhr.setRequestHeader("v", today);
            xhr.open("GET", URL, true);
            xhr.send();
        });
    }

    // function getRestaurantsDetails(restaurant) {
    //     return new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();

    //         xhr.onload = event => {
    //             if (xhr.status !== 200) {
    //                 reject(xhr.status);
    //             }
    //             const response = JSON.parse(xhr.responseText);
    //             resolve(response);
    //             //console.log(response.response.venues);
    //             //console.log(response.response.venues.id);
    //             for (var i = 0; i < response.response.venues.length; i++) {
    //                 restaurantsList.push(response.response.venues[i].id);
    //             }
    //             console.log("Retrieved Restaurant Details:" + restaurantsList);
    //         };
    //         var URL = "https://api.foursquare.com/v2/venues/" + restaurant.retaurantId;

    //         document.write(URL);
    //         xhr.open("GET", URL, true);
    //         xhr.send();
    //     });
    // }

});