var model = (function(){

  var splashesArray = [];
  var indexArray = [];
  function addSplashes(splashes_in_database){

    console.log(splashes_in_database)
    // Compare existing splashesArray to the splashes list given
    // If any new spashes, then add new splashes to splashesArray and return them
    var initial = false;
    if (splashesArray === []){
      initial = true;
    for (var i = 0; i < splashes_in_database.length; i++){
           if ($.inArray(splashes_in_database[i].id,indexArray) === -1)
                splashesArray.push(splashes_in_database[i]);
                indexArray.push(splashes_in_database[i].id);
                if (initial === false && splashes_in_database[i].author_name !== $('#login_name').text())
                  view.addSplash(splashes_in_database[i]);
            }


    }
  }

  function splashTime(){
    var timeCreatedAt = Date.parse(data.created_at);
    var newDate = new Date();
    var timeNow = Date.parse(newDate)

    var timeDifference = (timeNow - timeCreatedAt)/1000;

    var hours = Math.floor(timeDifference/3600);
    var minutes = Math.floor(timeDifference/60);
    if (minutes === 0){
      minutes += 1
    }
    if (hours > 0){
      var minutes = minutes - hours * 60
      time = hours + " and " + minutes + " ago ";
    }
    if (minutes < 2){
      time = minutes + " minute ago ";
    } else {
      time = minutes + " minutes ago ";
    }
  }

  function removeSplashes(){
    var now = new Date();
  }


  function getSplashes() {
    return indexArray;
  }

  return{
    removeSplashes: removeSplashes,
    splashTime: splashTime,
    addSplashes: addSplashes,
    getSplashes: getSplashes
  };
})();
