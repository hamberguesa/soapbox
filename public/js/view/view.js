var view = (function(){
  var addNewSplash = function(data){
    var splash = data["splash"]
    console.log(data["first_name"])
    $('#splash_list li:eq(0)').before('<li id="' + splash.id+'" class="splash">' + data["first_name"] + ' ' + data["last_name"] +'<br>' + splash.content + '</li>')  // add actual reference in place of 'SPLASH'
  };

  var showComments = function(){
    console.log(this.id)
      $('#'+ this.id+ ' .comment_div' ).slideToggle();
  };

  var addNewComment = function(data){
    var commentContent = data["content"]
    $('.comment_list').append('<li>' + commentContent + '</li>')  // add actual reference in place of 'COMMENT'
  };

  return{
    showComments: showComments,
    addNewSplash: addNewSplash
  };
})();
