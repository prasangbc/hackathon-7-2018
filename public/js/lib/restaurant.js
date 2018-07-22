class Restaurant {

    constructor(wtfId, source, id, name, address) {
        this.wtfId = wtfId;
        this.sourceIdentifiers = {
            [source]: id
        }
        this.name = name;
        this.address = address;
        this.wtfRating = 0;
        this.comments = null;
        this.menu = null;
        this.rating = 0;
        this.likes = 0;
        this.visitsCount = 0;
        this.hasMenu = false;
    }
}


export default Restaurant