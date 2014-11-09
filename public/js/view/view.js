var view = (function(){
  var interval;
  var counter = 0;
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
    $('#comment-'+ id).slideToggle();
  };

  var addNewComment = function(data){
    var commentContent = data["content"]
    console.log(data)
    var compiled_html = template.addComment({name: "Francis John", content: " commentContent"})
    console.log(compiled_html)
    $('.comment_list').append(compiled_html);
  };

  var stop = function(){
    clearInterval(interval)
  }

  var moveRight = function(data){
    $('.fa-chevron-right').mouseleave(stop);
    interval = setInterval(function(){
      $("#splash_list").css("right",counter + "px")
      counter += 10;
    },50);
  }

  var moveLeft = function(data){
    $('.fa-chevron-left').mouseleave(stop);
    interval = setInterval(function(){
      $("#splash_list").css("right", counter + "px")
      counter -= 10;
    },50);
  }

  return{
    showComments: showComments,
    addNewSplash: addNewSplash,
    moveRight: moveRight,
    moveLeft: moveLeft
  };
})();
