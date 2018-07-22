import restaurantKey from './common.js';
import Restaurant from './restaurant.js';

var restrauntsList = [];

function getLatLng(zipcode = 66210) {
    console.log("Get latitude and longitude for zipcode: " + zipcode);
    return new Promise((resolve, reject) => {
        const latlngRequest = new XMLHttpRequest();
        latlngRequest.onload = event => {
            if (latlngRequest.status !== 200) {
                reject(latlngRequest.status);
            }
            const response = JSON.parse(latlngRequest.responseText);
            console.log(response.json.results[0].geometry.location);
            resolve(response);
        }
        var URL = "/geocode?" + "zipcode=" + zipcode;
        latlngRequest.open("GET", URL, true);
        latlngRequest.send();
    });
    return fetch("/geocode?" + "zipcode=" + zipcode);
}

function getRestrauntsFromGoogle(query = 'biriyani', lat = '39.09973', lng = '-94.57857', radius = 25000, zipCode = 66210) {
    console.log("Get Restraunts from Google for lat: " + lat + "lng: " + lng);
    return new Promise((resolve, reject) => {
        const getRestrauntsFrmGoog = new XMLHttpRequest();
        getRestrauntsFrmGoog.onload = event => {
            if (getRestrauntsFrmGoog.status !== 200) {
                reject(getRestrauntsFrmGoog.status);
            }
            const response = JSON.parse(getRestrauntsFrmGoog.responseText);
            var restraunts = response.json.results;
            for(var i = 0; i < restraunts.length; i++) {
                var restrantWTFId = restaurantKey(restraunts[i].name, zipCode);
                var restraunt= new Restaurant(restrantWTFId, "GOOGLE", restraunts[i].place_id, restraunts[i].name, restraunts[i].formatted_address);
                restraunt.rating = restraunts[i].rating;
                restrauntsList.push(restraunt);
                getRestrauntFromGoogle(restraunt);
            }
            resolve(response);
        }
        var URL = "/places?" + "query=" + query
            + "&type=restaurant" + "&radius=" + radius + "&lat=" + lat + "&lng=" + lng;
        getRestrauntsFrmGoog.open("GET", URL, true);
        getRestrauntsFrmGoog.send();
    });
}

function getRestrauntFromGoogle(restraunt) {
    console.log("Enter Get Restraunt of Id:" + restraunt.sourceIdentifiers["GOOGLE"]);
    return new Promise((resolve, reject) => {
        const getRestrauntFrmGoog = new XMLHttpRequest();
        getRestrauntFrmGoog.onload = event => {
            if (getRestrauntFrmGoog.status !== 200) {
                reject(getRestrauntFrmGoog.status);
            }
            const response = JSON.parse(getRestrauntFrmGoog.responseText);
            var commentsList = [];
            var reviews = response.json.result.reviews;
            for(var i = 0; i< reviews.length; i++ ){
                commentsList.push(reviews[i].text);
            }
            restraunt.comments = commentsList;
            //console.log(response.json.result.reviews);
            console.log(restraunt)
            resolve(response);
        }
        var URL = "/place?" + "placeid=" + restraunt.sourceIdentifiers["GOOGLE"] + "&field=review";
        getRestrauntFrmGoog.open("GET", URL, true);
        getRestrauntFrmGoog.send();
    });
    console.log("Exit Get Restraunt of Id:" + place);
}

window.getLatLng = getLatLng
window.getRestrauntFromGoogle = getRestrauntFromGoogle
window.getRestrauntsFromGoogle = getRestrauntsFromGoogle
export {
    getLatLng,
    getRestrauntFromGoogle,
    getRestrauntsFromGoogle
}