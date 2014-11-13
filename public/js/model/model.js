var model = (function(){

  var splashesArray = [];
  var indexArray = [];
  function addSplashes(user_splashes){
    splashes_in_database = user_splashes.splashes
    meta_data = user_splashes.meta
    countArr = user_splashes.count
    // Compare existing splashesArray to the splashes list given
    // If any new spashes, then add new splashes to splashesArray and return them
    var initial = false;
    if (splashesArray.length === 0)
      initial = true;

    for (var i = 0; i < splashes_in_database.length; i++){
      favorited = meta_data[i].favorited
      count = countArr[i]
      if ($.inArray(splashes_in_database[i].id,indexArray) === -1)
      {
        splashesArray.push(splashes_in_database[i]);
        indexArray.push(splashes_in_database[i].id);
        if (initial === true)
           view.addSplash(splashes_in_database[i],favorited, count);
        else
        {
          if (!(splashes_in_database[i].author_name === $("#login_name").text()))
           view.addSplash(splashes_in_database[i],favorited, count);
        }
      }
    }
    controller.getComments();
    total_favs = user_splashes.total_favs
    view.addScore(total_favs)
  }

  function splashTime(data){
    time = moment(data.created_at).fromNow()
    return time
  }

  function getSplashes() {
    return indexArray;
  }

  return{
    // removeSplashes: removeSplashes,
    addSplashes: addSplashes,
    getSplashes: getSplashes,
    splashTime: splashTime
  };
})();
