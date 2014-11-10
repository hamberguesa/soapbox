// AJAX CALLS:
// create splash and prepend to the front of the list. (PortfolioJS, SimplyScroll jquery plugin or MouseWheel Plugin)
// inserts comment to bottom of comments and removes comment box on submission of comment form
// set timeout function to refresh the feed of splashes

// SLIDEDOWN MENU FOR COMMENTS
// slideDown when user wants to create a comment
// http://www.alessioatzeni.com/blog/signin-dropdown-box-like-twitter-with-jquery/
// http://alexsblog.org/2014/08/21/custom-html-dropdown-with-jquery/

var controller = (function(){
  var latitude;
  var longitude;
  var base_url = "http://soap-box-api.herokuapp.com";
  
  function getSplashes(){
    $.ajax({
      url: base_url+'/splashes',
      type: 'GET'
    }).done(view.addSplashes);
  }
  
  function createSplash(evt){
    evt.preventDefault();
    var data = $('#create-splash-form').serialize();

    $.ajax({
      url: base_url+'/splashes',
      type: 'POST',
      data: data
    }).done(view.addNewSplash);
    $('.paulund_block_page').fadeOut().remove();
  }

  function getComments(evt){
    if(evt.target !== this)
      return;
    view.showComments(this.id);
  }

  function createComment(evt){
    evt.preventDefault();
    id = $(this).parent().parent().parent()[0].id;
    var data = $(this).serialize();
    $.ajax({
      url: base_url+'/splashes/'+id+'/comment',
      type: 'POST',
      data: data
    }).done(view.addNewComment);
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
      })
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
    view.addSplashContainer();
    view.addCreateSplashButton();
    // loop through the splashes that should be displayed and 'createSplash' for each 
    createSplash();
    // same for comments ('createComment')
    createComment();
  }
  
  function bindEvents(){
    if(loggedin){
      buildIndexPage();
    } else {
      buildLoginPage();
    };
    
    view.addColors();
    geolocation.getLocation();
    $('#splash_list').on('submit', '.submit_comment', createComment);
    $('#splash_list').on('click','.splash', getComments);
    $('.container').on('submit','#create-splash-form', createSplash);
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
