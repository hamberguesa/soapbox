var view = (function(){
  var interval;
  var counter = 0;

  var addSplash = function(data){
    time = model.splashTime(data);
    if(data.favorited)
      color = "gold"
    else
      color = "black"

    console.log(data)
    var compiled_html = template.addSplash({id: data.id, name: data.author_name, content: data.content, time_ago: time, color: color });
    if($('#splash_list li.splash').length > 0)
      $('#splash_list li.splash:eq(0)').before($(compiled_html));
    else
      $('#splash_list').append($(compiled_html));
    // $('#splash_list li.splash:eq(0)').css("background-color",Please.make_color());
  };

  // var addAllSplashes = function(splashes_list){
  //   for(var i=0; i < splashes_list.length; i++)
  //   {
  //     var splash = splashes_list[i]
  //     var compiled_html = template.addSplash({id: splash.id, first: data["first_name"], last: data["last_name"], content: splash.content })
  //     $('#splash_list li:eq(0)').before(compiled_html);

  //   }
  // }


  var addLogin = function(){
    $('body').html(template.addLogin());
  };

  var addHeader = function(){
    $('body').html(template.addHeader());
  };

  var addSplashContainer = function(){
     // ($(template.addSplashContainer())).after( $('nav') );
     $('body').append(template.addSplashContainer());
  };

  var addCreateSplashButton = function(){
    $('body').append(template.addCreateSplashButton());
  };

  var showComments = function(id){
    $('#comment-'+ id).slideToggle();
  };

  var addComment = function(data){
    var commentContent = data["content"];
    var compiled_html = template.addComment({name: data["author_name"], content: commentContent});
    $('#comment-'+data["splash_id"]).append(compiled_html);
  };

  var addHeader = function(){
    $('body').html(template.addHeader());
    // $('.container').before(template.addHeader());
  };

  var addLogin = function(){
    $('body').html(template.addLogin());
  };

  var stop = function(){
    clearInterval(interval);
  };

  var addColors = function(){
      // $('#splash_list .splash').each(function(index,element)
      // {
      //   $(element).css('background-color',Please.make_color());
      // });

  };

  var moveRight = function(data){
    $('.fa-chevron-right').mouseleave(stop);
    interval = setInterval(function(){
      if(parseInt($("#splash_list").css("right")) > ($("#splash_list .splash").length-3) * $(".splash").width())
      return
      $("#splash_list").css("right",counter + "px");
      counter += 30;

    },50);
  };

  var moveLeft = function(data){
    $('.fa-chevron-left').mouseleave(stop);

    interval = setInterval(function(){
     if(parseInt($("#splash_list").css("right")) < 0 )
      return;
      $("#splash_list").css("right", counter + "px");
      counter -= 30;
    },50);
  };

  return{
    showComments: showComments,
    addSplash: addSplash,
    addComment: addComment,
    moveRight: moveRight,
    moveLeft: moveLeft,
    addColors: addColors,
    addHeader: addHeader,
    addLogin: addLogin,
    addSplashContainer: addSplashContainer,
    addCreateSplashButton: addCreateSplashButton
  };
})();
