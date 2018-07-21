class Restaurant {

    constructor(restaurantId, restaurantName, restaurantAddress) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.wtfRating = 0;
        this.comments = null;
        this.menu = null;
    }

}

export default Restaurant