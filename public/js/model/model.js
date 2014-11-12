var model = (function(){

  var splashesArray = [];
  var indexArray = [];
  function addSplashes(splashes_in_database){

    // Compare existing splashesArray to the splashes list given
    // If any new spashes, then add new splashes to splashesArray and return them
    var initial = false;
    if (splashesArray === [])
      initial = true;

    for (var i = 0; i < splashes_in_database.length; i++){

      if ($.inArray(splashes_in_database[i].id,indexArray) === -1)
      {
        splashesArray.push(splashes_in_database[i]);
        indexArray.push(splashes_in_database[i].id);

        if (initial === false && splashes_in_database[i].author_name !== $('#login_name').text())
          view.addSplash(splashes_in_database[i]);

      }
    }
  }

  function splashTime(data){
    time = moment(data.created_at).fromNow()
    console.log(data)
    console.log(moment(data.created_at))
    console.log(moment(data.created_at).fromNow());
    //console.log(moment(data.created_at, moment.ISO_8601))

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
