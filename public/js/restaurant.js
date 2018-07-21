class Restaurant {

    constructor(restaurantId, restaurantName, restaurantAddress) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.wtfRating = 0;
        this.comments = null;
        this.menu = null;
        this.rating = 0;
        this.restaurantLikes = 0;
        this.restaurantVisitsCount = 0;
    }

}

export default Restaurant