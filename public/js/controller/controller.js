var controller = (function(){
  var latitude;
  var longitude;
  var base_url = "http://localhost:9393"
  var currUser;
  // var base_url = "http://soap-box-api.herokuapp.com";

  function getSplashes(){
    $.ajax({
      url: base_url+'/splashes',
      type: 'GET'
    }).done(model.addSplashes);
  }

  function getComments(){
    splashesArr = model.getSplashes();
    for(i = 0; i < splashesArr.length; i++)
    {
      id = splashesArr[i]
    $.ajax({
      url: base_url+'/splashes/'+id+'/comments',
      type: 'GET'
    }).done(view.addComment);
    }
  }

  function createSplash(evt){
    evt.preventDefault();
    var data = $('#create-splash-form').serialize();
    // console.log($('#create-splash-form'))
    // console.log(data)
    $.ajax({
      url: base_url+'/splashes',
      type: 'POST',
      data: data
    }).done(addSplash);
    $('.paulund_block_page').fadeOut().remove();
  }

  function addSplash(data){
    view.addSplash(data.splashes, false, data.count)
    console.log(data)
  }

  function showComments(evt){
    if(evt.target !== this)
      return;
    view.showComments(this.id);
  }


  // Might work; need to test after log-in capability returned
  function createComment(evt){
    evt.preventDefault();
    id = $(this).parent().parent()[0].id;
    console.log(id)
    var data = $(this).serialize();
    // data.user_id = localStorage.getItem("user_id")
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
        data: {lat: latitude, lon: longitude},

          // user_id: localStorage.getItem("user_id")},
        statusCode:{
          401: function(){}
        },
      }).done(function(data){
        model.addSplashes(data);
        poll();
      });
    }, 10000);
  }

  function updateCoords(lat, lon){
    latitude = lat;
    longitude = lon;
  }

  function getUser(){
    $.ajax({
      url: '/user'
    }).done(function(data){
      $("#login_name").text(data.first_name + " " + data.last_name);
    });

  }

  function addBodyRipples(){
    $('body').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04,
    });
  }

  function buildLoginPage() {
    view.addLogin();
  }

  function buildIndexPage() {
    view.addHeader();
    view.addCreateSplashButton();
    view.addSplashContainer();
    view.addDashboard();
    view.addFooter();
    view.addLoading();

    // loop through the splashes that should be displayed and 'createSplash' for each
    getSplashes();
    // same for comments ('createComment')
    getComments();
    $('.paulund_modal').paulund_modal_box();
    getUser();
    addBodyRipples();
  }

  function wordCount(){
    var text_max = 255;
    $('#textarea_feedback').text(text_max + ' characters remaining');

    $('body').keyup('#modal_content',function() {
      console.log($('#modal_content').val())
      if ($('#modal_content').val())
      {
        var text_length = $('#modal_content').val().length;
        var text_remaining = text_max - text_length;
        $('#textarea_feedback').text(text_remaining + ' characters remaining');
      }
    });
  }

  function switchFavorite(data){
    id = $(this).parent().parent().attr("id")
    $.ajax({
      url: '/splashes/'+id+'/favorite'
    }).done(view.switchFavorite)
  }

  function bindEvents(){
   if($('#indexpage').length === 1){
      buildIndexPage();
    }
    else {
     buildLoginPage();
   };
    poll();
    geolocation.getLocation();
    $('body').on('click','.favorite', switchFavorite);
    $('body').on('submit', '.submit_comment', createComment);
    $('body').on('click','.splash', showComments);
    $('body').on('submit','#create-splash-form', createSplash);
    $('.fa-chevron-right').mouseenter(view.moveRight);
    $('.fa-chevron-left').mouseenter(view.moveLeft);
  }

  return{
    createSplash: createSplash,
    createComment: createComment,
    poll: poll,
    bindEvents: bindEvents,
    updateCoords: updateCoords,
    wordCount: wordCount,
    switchFavorite: switchFavorite,
    getComments: getComments,
    addBodyRipples: addBodyRipples
  };
})();

