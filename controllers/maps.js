const key = 'AIzaSyC2b3qoEKIIeeQN0YvMqOS8dupyy8p5cKg';
const googleMapsClient = require('@google/maps').createClient({
    key,
});
const promisify = require('util').promisify;
const populateResponseFromPromise = (promise, res) => promise
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        res.status(500, {
            error: err
        });
    });

exports.geocode = (req, res) => {
    const { params: zipCode = zipcode } = req;
    res.setHeader('Content-Type', 'application/json');
    populateResponseFromPromise(
        promisify(googleMapsClient.geocode)({ address: zipCode.toString() }), res)
}

exports.places = (req, res) => {
    const { query: queryParams } = req;
    const {
        query:
        query,
        type,
        radius,
        lat,
        lng
    } = queryParams;
    res.setHeader('Content-Type', 'application/json');
    populateResponseFromPromise(
        promisify(googleMapsClient.places)({
            query,
            type,
            radius: parseInt(radius, 10),
            location: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
        }), res)
}

exports.place = (req, res) => {
    const { query: queryParams } = req;
    const {
        placeid,
        field
    } = queryParams;
    res.setHeader('Content-Type', 'application/json');
    //console.log(req);
    console.log(queryParams);
    console.log({ placeid, fields: [field] });
    populateResponseFromPromise(
        promisify(googleMapsClient.place)({
            placeid,
            fields: [field]
        }), res)
}
