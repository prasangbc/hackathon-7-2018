$(document).ready(() => {
  function retrieveMentionedComments(restaurantsList, searchString) {
    document.write("test12"); //need to commit
    searchString = "basdlkf ja232r423!01234889&9"; //need to commit
    var singleWordStrings = searchString.split(" ");
    var refinedSingleWordStrings = []
    singleWordStrings.forEach(element => {
      refinedSingleWordStrings.push(element.replace(/[^a-zA-Z0-9 ]/g, ""));
      //document.write("<br>each word:" + element.replace(/[^a-zA-Z0-9 ]/g, ""));
    });
  
    var searchWordSize = refinedSingleWordStrings.length;
    var found = false;

    //restaurantsList.forEach(oneRestaurant => {
    for(var k = 0; k < restaurantsList.length; k++){
      //var commentsSize = restaurantsList[k].comments.length;
      for (var i = 0; i < commentsSize; i++) {
        for (var j = 0; j < searchWordSize; j++) {
          found = false;
          if (restaurantsList.comments[i].includes(restaurantsList.comments[i]))
            found = true;
          else
            break;
        }

        if (found == true && j == searchWordSize)
          document.write("I need to add it to the results")
      }
    }
      

  }
  //retrieveMentionedComments();
});


//clubing the two outputs

