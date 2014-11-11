var controller = (function(){
  var latitude;
  var longitude;
  var base_url = "http://soap-box-api.herokuapp.com";
  
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
      url: base_url+'splashes/'+id+'/comments',
      type: 'GET'
    }).done(view.addComment);
    }
  }
  
  function createSplash(evt){
    evt.preventDefault();
    var data = $('#create-splash-form').serialize();

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
    console.log($(this).parent().parent().parent())
    var data = $(this).serialize();
    $.ajax({
      url: base_url+'/splashes/'+id+'/comment',
      type: 'POST',
      data: data
    }).done(view.addComment);
    $(this)[0].elements.content.value = "";
  }

  function poll() {

    setTimeout(function () {
      geolocation.getLocation();
      $.ajax({
        url: base_url+'/splashes',
        dataType: "json",
        data: {lat: latitude, lon: longitude}
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
  
  function bindEvents(){
    // if(loggedin){
      buildIndexPage();
    // } else {
      // buildLoginPage();
    // };
    
    view.addColors();
    geolocation.getLocation();
    $('#splash_list').on('submit', '.submit_comment', createComment);
    $('#splash_list').on('click','.splash', showComments);
    $('body').on('submit','#create-splash-form', createSplash);
    $('.fa-chevron-right').mouseenter(view.moveRight);
    $('.fa-chevron-left').mouseenter(view.moveLeft);
  }

  return{
    createSplash: createSplash,
    createComment: createComment,
    poll: poll,
    bindEvents: bindEvents,
    updateCoords: updateCoords
  };
})();

controller.poll();
