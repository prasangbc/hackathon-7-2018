//$(document).ready(() => {
function retrieveMentionedComments(restaurantsList, rawInputSearchString) {
    //document.write("test12\n"); //need to commit
    var refinedSingleWordStrings = searchString(rawInputSearchString);
    var searchWordSize = refinedSingleWordStrings.length;
    var found = false;
    //retrieveMentionedComments.mergeResults = [];

    //restaurantsList.forEach(oneRestaurant => {
    for (var k = 0; k < restaurantsList.length; k++) {
        var refinedComments = refineComments(restaurantsList[k].comments);
        var commentsSize = refinedComments.length;
        var commentsToAdd = [];
        //console.log(restaurantsList);
        for (var i = 0; i < commentsSize; i++) {
            for (var j = 0; j < searchWordSize; j++) {
                found = false;
                if (refinedComments[i].includes(refinedSingleWordStrings[j]))
                    found = true;
                else
                    break;
            }

            if (found == true && j == searchWordSize) {
                commentsToAdd.push(i);
            }
        }

        //Restaurant to add
        if (typeof retrieveMentionedComments.mergeResults == 'undefined' && commentsToAdd.length > 0) {
            retrieveMentionedComments.mergeResults = {};
        }

        if (commentsToAdd.length > 0) {
            var restaurantAlreadyExists = restaurantsList[k].wtfId in retrieveMentionedComments.mergeResults;
            var obj;
            if (!restaurantAlreadyExists) {
                obj = {
                    wtfId: restaurantsList[k].wtfId,
                    name: restaurantsList[k].name,
                    address: restaurantsList[k].address,
                    wtfRating: restaurantsList[k].wtfRating,
                    likes: restaurantsList[k].likes,
                    visitsCount: restaurantsList[k].visitsCount
                }

                //added comments
                obj.menuItemComments = [];
                commentsToAdd.forEach(element => {
                    obj.menuItemComments.push(restaurantsList[k].comments[element]);
                });

                //add menu price of the item or if it is present in the menu

            } else {
                //when the restaurant is already present in the list (came in from different api)
                obj = retrieveMentionedComments.mergeResults[restaurantsList[k].wtfId];
                //append the comments
                commentsToAdd.forEach(element => {
                    obj.menuItemComments.push(restaurantsList[k].comments[element]);
                });

            }
        }
        //adding to merge result
        retrieveMentionedComments.mergeResults[restaurantsList[k].wtfId] = obj;

        return retrieveMentionedComments.mergeResults.sort(sortBasedOnSecretSauce);
        //console.log(retrieveMentionedComments.mergeResults);
      }
    }
}

function searchString(rawString) {
    //rawString = "basdlkf ja232r423!01234889&9"; //need to commit
    var singleWordStrings = rawString.split(" ");
    var refinedSingleWordStrings = []
    singleWordStrings.forEach(element => {
        refinedSingleWordStrings.push(element.replace(/[^a-zA-Z0-9 ]/g, ""));
        //document.write("<br>each word:" + element.replace(/[^a-zA-Z0-9 ]/g, ""));
    });

    return refinedSingleWordStrings;
}

  function refineComments(rawComments) {
    var newComments = [];
    rawComments.forEach(element => {
        newComments.push(element.replace(/[^a-zA-Z ]/g, " ").toLowerCase());
    });

    return newComments;
  }

  //search the menu for the menuitem
  function searchMenu(rawMenu, refinedString) {

  }

  //This is the secret sauce, lol
  function sortBasedOnSecretSauce(aRestaurant, bRestaurant) {
    if (aRestaurant.menuItemComments.length < bRestaurant.menuItemComments.length)
      return 1;
    else if (bRestaurant.menuItemComments.length > bRestaurant.menuItemComments.length)
      return -1;
    else {
      if (aRestaurant.likes < bRestaurant.likes)
        return 1;
      else if (bRestaurant.likes > bRestaurant.likes)
        return -1;
      else {
        if (aRestaurant.visitsCount < bRestaurant.visitsCount)
          return 1;
        else
          return -1;
      }
    }
  }

  //var testObj = [{"menuItemComments":[], "likes":1, "visitsCount":4}
  //              ,{ "menuItemComments": ["w"], "likes": 1, "visitsCount": 2 }
  //              ,{ "menuItemComments": [], "likes": 1, "visitsCount": 3 }] 

  //console.log("this is shit")
  //console.log(testObj.sort(sortBasedOnSecretSauce));
  //// Leave it here for testing purposes
   //var restestObj = [{
  //  "address": [
  //    "101 E 13th St (at Walnut St)",
  //    "Kansas City, MO 64106",
  //    "United States"
  //  ],
  //  "comments": [
  //    "Join the UFO Club!",
  //    "It's in the P&L area, but be sure to chain your douchebag up outside before you come in.",
  //    "Sunday nights they have $2.75 pints from Missouri and Kansas. This means Boulevard.",
  //    "Sure they've got 74 beers on tap and over 200 on the menu, but the food is crazy good!  Try their wildly popular Saucer Bratzel.",
  //    "The pretzels make me want to slap my grandma they are so good.",
  //    "Burgers are crazy good! Oh and beer... A-mazing!",
  //    "Avoid the beer cheese soup at all costs. It tastes like nasty watered down queso and comes in a giant bread bowl that the menu fails to mention.",
  //    "The amazingly knowledgeable staff are the best.  It's comforting to know that North Coast's Old Rasputin is always on tap. Did I mention that they have the best trivia in KC on Tuesdays.",
  //    "Drink Heavily...then Tip Well",
  //    "Have the double chocolate stout ice cream float! Sounds a little weird, but it's surprisingly good.",
  //    "Our waitress knew her stuff & offered suggestions & samples. Try the beer flights! Also you can't go wrong with the \"Reuben-esque\" sandwich. THE BEST!! Go w a side salad & house dressing (kinda spicy)",
  //    "A real fan favorite in the P&L District, this place gets props for a big beer list and awesome Tuesday trivia.",
  //    "Service sucks ass today. Guess there's a 1st for everything. They're not even that busy.",
  //    "Try the soft pretzels with the german mustard! So delicious.",
  //    "If you have a Yelp account, check in here. You can get deals and specials.",
  //    "Stone beer arrived a couple weeks ago! Great beer!!!",
  //    "Come for trivia night Cassie is awesome.",
  //    "Trivia game on Tuesdays!",
  //    "Most pints are $2.75 on Monday night.  Enjoy a couple and admire plate #72 on the wall.",
  //    "Avery IPA is a great IPA"
  //  ],
  //  "hasMenu": false,
  //  "likes": 403,
  //  "menu": [],
  //  "name": "Flying Saucer",
  //  "rating": 9,
  //  "sourceIdentifiers": {
  //    "FOURSQUARE": "4ae39f1cf964a520589721e3"
  //  },
  //  "visitsCount": 39678,
  //  "wtfId": "FlyingSaucer64106",
  //  "wtfRating": 0
  //},
  //  {
  //    "address": [
  //      "101 E 13th St (at Walnut St)",
  //      "Kansas City, MO 64106",
  //      "United States"
  //    ],
  //    "comments": [
  //      "Join the UFO Club!",
  //      "It's in the P&L area, but be sure to chain your douchebag up outside before you come in.",
  //      "Sunday nights they have $2.75 pints from Missouri and Kansas. This means Boulevard.",
  //      "Sure they've got 74 beers on tap and over 200 on the menu, but the food is crazy good!  Try their wildly popular Saucer Bratzel.",
  //      "The pretzels make me want to slap my grandma they are so good.",
  //      "Burgers are crazy good! Oh and beer... A-mazing!",
  //      "Avoid the beer cheese soup at all costs. It tastes like nasty watered down queso and comes in a giant bread bowl that the menu fails to mention.",
  //      "The amazingly knowledgeable staff are the best.  It's comforting to know that North Coast's Old Rasputin is always on tap. Did I mention that they have the best trivia in KC on Tuesdays.",
  //      "Drink Heavily...then Tip Well",
  //      "Have the double chocolate stout ice cream float! Sounds a little weird, but it's surprisingly good.",
  //      "Our waitress knew her stuff & offered suggestions & samples. Try the beer flights! Also you can't go wrong with the \"Reuben-esque\" sandwich. THE BEST!! Go w a side salad & house dressing (kinda spicy)",
  //      "A real fan favorite in the P&L District, this place gets props for a big beer list and awesome Tuesday trivia.",
  //      "Service sucks ass today. Guess there's a 1st for everything. They're not even that busy.",
  //      "Try the soft pretzels with the german mustard! So delicious.",
  //      "If you have a Yelp account, check in here. You can get deals and specials.",
  //      "Stone beer arrived a couple weeks ago! Great beer!!!",
  //      "Come for trivia night Cassie is awesome.",
  //      "Trivia game on Tuesdays!",
  //      "Most pints are $2.75 on Monday night.  Enjoy a couple and admire plate #72 on the wall.",
  //      "Avery IPA is a great IPA"
  //    ],
  //    "hasMenu": false,
  //    "likes": 403,
  //    "menu": [],
  //    "name": "Flying Saucer",
  //    "rating": 9,
  //    "sourceIdentifiers": {
  //      "FOURSQUARE": "4ae39f1cf964a520589721e3"
  //    },
  //    "visitsCount": 39678,
  //    "wtfId": "FlyingSaucer64106",
  //    "wtfRating": 0
  //  }]

  //document.write("test");
  //document.write(JSON.stringify(retrieveMentionedComments(restestObj, "burgers")));
  //document.write(refineComments(['asdfsad', "q3412! asdfa asdfasf", "It's in the P&L area, but be sure to chain your douchebag up outside before you come in"]));
//});


//clubing the two outputs
export default retrieveMentionedComments