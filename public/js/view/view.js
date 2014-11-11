var view = (function(){
  var interval;
  var counter = 0;

  var addSplash = function(data){
    
    var timeCreatedAt = Date.parse(data.created_at);
    var newDate = new Date();
    var timeNow = Date.parse(newDate);

    var timeDifference = (timeNow - timeCreatedAt)/1000;

    var hours = Math.floor(timeDifference/3600);
    var minutes = Math.floor(timeDifference/60);
    if (minutes === 0){
      minutes += 1;
    }
    if (hours > 0){
      var newMinutes = minutes - hours * 60;
      time = hours + " and " + newMinutes + " ago ";
    }
    if (minutes < 2){
      time = minutes + " minute ago ";
    } else {
      time = minutes + " minutes ago ";
    }


    var compiled_html = template.addSplash({id: data.id, name: data.author_name, content: data.content, time_ago: time });
    if($('#splash_list li.splash').length > 0)
      $('#splash_list li.splash:eq(0)').before($(compiled_html));
    else
      $('#splash_list').append($(compiled_html));
    $('#splash_list li.splash:eq(0)').css("background-color",Please.make_color());    
  };

  // var timeElapsed = function(){
  //   var timeCreatedAt = Date.parse(data.created_at);
  //   var newDate = new Date();
  //   var timeNow = Date.parse(newDate)

  //   var timeDifference = (timeNow - timeCreatedAt)/1000;

  //   var hours = Math.floor(timeDifference/3600);
  //   var minutes = Math.floor(timeDifference/60);
  //   //need to add logic to subtract hours from minutes when there are hours
  //   if (minutes === 0){
  //     minutes += 1
  //   }
  //   if (hours > 0){
  //     var newMinutes = minutes - hours * 60
  //     time = hours + " and " + newMinutes + " ago ";
  //   }
  //   if (minutes < 2){
  //     time = minutes + " minute ago ";
  //   } else {
  //     time = minutes + " minutes ago ";
  //   }
  //   return time
  // };

  // var addAllSplashes = function(splashes_list){
  //   for(var i=0; i < splashes_list.length; i++)
  //   {
  //     var splash = splashes_list[i]
  //     var compiled_html = template.addSplash({id: splash.id, first: data["first_name"], last: data["last_name"], content: splash.content })
  //     $('#splash_list li:eq(0)').before(compiled_html);

  //   }
  // }
  
  var addSplashContainer = function(){
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
    $('body').append(template.addHeader());
    // $('.container').before(template.addHeader());
  };
  
  var addLogin = function(){
    $('body').prepend(template.addLogin());
  };

  var stop = function(){
    clearInterval(interval);
  };

  var addColors = function(){
      $('#splash_list .splash').each(function(index,element)
      {
        $(element).css('background-color',Please.make_color());
      });
  };

  var moveRight = function(data){
    $('.fa-chevron-right').mouseleave(stop);
    interval = setInterval(function(){
      if(parseInt($("#splash_list").css("right")) > ($("#splash_list .splash").length-3) * $(".splash").width())
      return
      $("#splash_list").css("right",counter + "px");
      counter += 10;

    },50);
  };

  var moveLeft = function(data){
    $('.fa-chevron-left').mouseleave(stop);

    interval = setInterval(function(){
    console.log($("#splash_list").css("right"));
     if(parseInt($("#splash_list").css("right")) < 0 )
      return;
      $("#splash_list").css("right", counter + "px");
      counter -= 10;
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
