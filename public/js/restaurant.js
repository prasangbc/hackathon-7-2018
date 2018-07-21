class Restaurant {

    constructor(wtfId, restaurantsource, restaurantId, restaurantName, restaurantAddress) {
        this.wtfId = wtfId;
        this.sourceIdentifiers[restaurantsource] = restaurantId;
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