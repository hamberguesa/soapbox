var model = (function(){

  var splashesArray = [];

  function addSplashes(splashes_in_database){
    console.log('made it')
    // Compare existing splashesArray to the splashes list given
    // If any new spashes, then add new splashes to splashesArray and return them
    for (var i = 0; i < splashes_in_database.length; i++){
        for (var j = 0; j < splashesArray.length; j++){
            if(splashes_in_database[i] != splashesArray[j]){
                splashesArray.push(splashes_in_database[i]);
            }
        }
    }
    console.log(splashesArray);
    return splashesArray;
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

  function getSplashes(){
    return splashesArray;
  }

  return{
    removeSplashes: removeSplashes,
    splashTime: splashTime,
    addSplashes: addSplashes,
    getSplashes: splashesArray
  };
})();
