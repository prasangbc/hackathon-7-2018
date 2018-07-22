function restaurantKey(name, zip) {
    var key = name.replace(/ /g, '') + zip;
    return key;
}

export default restaurantKey