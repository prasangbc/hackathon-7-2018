
//$(document).ready(() => {
  function retrieveMentionedComments(restaurantsList, searchString) {
    document.write("test12"); //need to commit
    var refinedSingleWordStrings = searchString(searchString);
    var searchWordSize = refinedSingleWordStrings.length;
    var found = false;
    //retrieveMentionedComments.mergeResults = [];

    //restaurantsList.forEach(oneRestaurant => {
    for (var k = 0; k < restaurantsList.length; k++) {
      //var commentsSize = restaurantsList[k].comments.length;
      var commentsToAdd = [];
      for (var i = 0; i < commentsSize; i++) {
        for (var j = 0; j < searchWordSize; j++) {
          found = false;
          if (restaurantsList[k].comments[i].includes(restaurantsList[k].comments[i]))
            found = true;
          else
            break;
        }

        if (found == true && j == searchWordSize) {
          commentsToAdd.push(k);
        }
      }

      //Restaurant to add
      if (typeof retrieveMentionedComments.mergeResults == 'undefined') {
        retrieveMentionedComments.mergeResults = new HashMap();
      }
      else {
        //if the restaurant is not already present in the map
        if (!retrieveMentionedComments.mergeResults.has(restaurantsList[k].wtfId)) {
          var obj = {
            wtfId: restaurantsList[k].wtfId,
            name: restaurantsList[k].name,
            address: restaurantsList[k].address,
            wtfRating: restaurantsList[k].wtfRating,
            likes: restaurantsList[k].likes,
            visitsCount: restaurantsList[k].visitsCount

            //also need to add comments, menu price etc
          }
        }
        else {

        }
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
  //retrieveMentionedComments();
//});


//clubing the two outputs

