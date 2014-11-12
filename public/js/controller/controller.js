var controller = (function(){
  var latitude,longitude;
  var loggedIn = false;
  var accessToken;
  var header = "";
  var base_url = "http://soap-box-api.herokuapp.com/api/v0";

  function getSplashes(){
      geolocation.getLocation();

    $.ajax({
      url: base_url+'/splashes',
      type: 'GET',
      statusCode:{
          401: function(){console.log("No good!")}
        },
      data: {lat: latitude, lon: longitude, user_id: localStorage.getItem("user_id")}
    }).done(model.addSplashes);
  }

  function getComments(){
    splashesArr = model.getSplashes();
    for(i = 0; i < splashesArr.length; i++)
    {
      id = splashesArr[i]
    $.ajax({
      url: base_url+'splashes/'+id+'/comments',
      type: 'GET',
      data: {user_id: localStorage.getItem("user_id")}
    }).done(view.addComment);
    }
  }

  function createSplash(evt){
    evt.preventDefault();
    var data = $('#create-splash-form').serialize();
    data.user_id = localStorage.getItem("user_id")
    data.token = accessToken
    $.ajax({
      url: base_url+'/splashes',
      type: 'POST',
      data: data
    }).done(view.addSplash);
    $('.paulund_block_page').fadeOut().remove();
  }

  function showComments(evt){
    if(evt.target !== this)
      return;
    view.showComments(this.id);
  }

  // Might work; need to test after log-in capability returned
  function createComment(evt){
    evt.preventDefault();
    id = $(this).parent().parent().parent()[0].id;
    var data = $(this).serialize();
    data.user_id = localStorage.getItem("user_id")
    $.ajax({
      url: base_url+'/splashes/'+id+'/comment',
      type: 'POST',
      data: data
    }).done(view.addComment);
    $(this)[0].elements.content.value = "";
  }


  function poll() {

    timeout = setTimeout(function () {
      $.ajax({
        url: base_url+'/splashes',
        dataType: "json",
        data: {lat: latitude, lon: longitude, user_id: localStorage.getItem("user_id")},
        statusCode:{
          401: function(){}
        },
      }).done(function(data){
        model.addSplashes(data);
          poll();
      });
    }, 5000);
  }

  function updateCoords(lat, lon){
    latitude = lat;
    longitude = lon;
  }

  function buildLoginPage() {
    view.addLogin();
  }

  function buildIndexPage() {
    view.addHeader();
    view.addCreateSplashButton();
    view.addSplashContainer();
    // loop through the splashes that should be displayed and 'createSplash' for each
    getSplashes();
    // same for comments ('createComment')
    getComments();
  }

  function wordCount(){
  //     var text_max = 255;
  //     $('#textarea_feedback').html(test_max + ' characters remaining');

  //     $('#modal_content').keyup(function() {
  //       var text_length = $('#modal_content').val().length;
  //       var text_remaining = text_max - text_length;

  //       $('#textarea_feedback').html(text_remaining + ' characters remaining');
  //   });
  }
  function loggedInStatus(){
    return loggedIn;
  }

  function updateLoggedInStatus(status){
    loggedIn = status;
  }

  function bindEvents(){
    // if(localStorage.getItem("user_id")){
    //   buildIndexPage();
    // } else {
      buildLoginPage();
    // };
    view.addColors();
    geolocation.getLocation();
    // $('document').ready('wordCount')
    $('#splash_list').on('submit', '.submit_comment', createComment);
    $('#splash_list').on('click','.splash', showComments);
    $('body').on('submit','#create-splash-form', createSplash);
    $('.fa-chevron-right').mouseenter(view.moveRight);
    $('.fa-chevron-left').mouseenter(view.moveLeft);
   // oauth.getLoginStatus();

  }

  function storeToken(token){
    accessToken = token;
  }

  function setHeader(id){
    header = id
  }

  return{
    createSplash: createSplash,
    createComment: createComment,
    poll: poll,
    bindEvents: bindEvents,
    updateCoords: updateCoords,
    wordCount: wordCount,
    updateLoggedInStatus: updateLoggedInStatus,
    loggedInStatus: loggedInStatus,
    storeToken: storeToken,
    buildIndexPage: buildIndexPage,
    buildLoginPage: buildLoginPage,
    baseUrl: base_url,
    setHeader: setHeader
  };
})();

