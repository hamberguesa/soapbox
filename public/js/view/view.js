var view = (function(){
  var addNewSplash = function(data){
    var compiled_html = template.addSplash({id: data.id, name: data.author_name, content: data.content })
    $('#splash_list li:eq(0)').before(compiled_html);
  };

  var addAllSplashes = function(splashes_list){
    for(var i=0; i < splashes_list.length; i++)
    {
      var splash = splashes_list[i]
      var compiled_html = template.addSplash({id: splash.id, first: data["first_name"], last: data["last_name"], content: splash.content })
      $('#splash_list li:eq(0)').before(compiled_html);

    }
  }

  var showComments = function(id){
    $('#'+ id + ' .comment_div' ).slideToggle();
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
