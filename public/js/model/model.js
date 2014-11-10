var model = (function(){

  var splashesArray = [];

  function addSplashes(splashes_in_database){
    // Compare existing splashesArray to the splashes list given
    // If any new spashes, then add new splashes to splashesArray and return them
    for (var i = 0; i < splashes_in_database.length; i++){
        for (var j = 0; j < splashesArray.length; j++){
            if(splashes_in_database[i] != splashesArray[j]){
                splashesArray.push(splashes_in_database[i]);
            }
        }
    }
    for(i=0; i < splashesArray.length; i++)
    {
      view.addNewSplash(splashesArray[i])
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
    addSplashes: addSplashes,
    getSplashes: splashesArray
  };
})();
