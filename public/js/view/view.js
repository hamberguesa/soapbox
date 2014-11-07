var view = (function(){
  var showSplashes = function(){
    
  };
  
  var addNewSplash = function(data){
    var splashContent = data["content"]
    $('#splash_list').append("<li>splashContent</li>")  // add actual reference in place of 'SPLASH'
  };
  
  var showComments = function(){
    slideDown()
  };
  
  var addNewComment = function(data){
    var commentContent = data["content"]
    $('#comment_list').append("<li>commentContent</li>")  // add actual reference in place of 'COMMENT'
  };

  return{

  };
})();
