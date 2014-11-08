var view = (function(){  
  var addNewSplash = function(data){
    var splashContent = data["content"]
    $('#splash_list').append('<li>' + splashContent + '</li>')  // add actual reference in place of 'SPLASH'
  };
  
  var showComments = function(){
    $('#comment_div').on('click', function() {
      $('#comment_div').slideToggle();
    })
  };
  
  var addNewComment = function(data){
    var commentContent = data["content"]
    $('#comment_list').append('<li>' + commentContent + '</li>')  // add actual reference in place of 'COMMENT'
  };

  return{

  };
})();
