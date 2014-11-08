// AJAX CALLS:
// create splash and prepend to the front of the list. (PortfolioJS, SimplyScroll jquery plugin or MouseWheel Plugin)
// inserts comment to bottom of comments and removes comment box on submission of comment form
// set timeout function to refresh the feed of splashes

// SLIDEDOWN MENU FOR COMMENTS
// slideDown when user wants to create a comment
// http://www.alessioatzeni.com/blog/signin-dropdown-box-like-twitter-with-jquery/
// http://alexsblog.org/2014/08/21/custom-html-dropdown-with-jquery/

var controller = (function(){

  function createSplash(evt){
    evt.preventDefault();
    var data = $('#create-splash-form').serialize();

    console.log('create_splash')
    $.ajax({
      url: '/splashes',
      type: 'POST',
      data: data
    }).done(view.addNewSplash)
    $('.paulund_block_page').fadeOut().remove();
  }

  function getComments(evt){
    evt.preventDefault();
    console.log(this.id)
    $.ajax({
      url: '/splashes/'+this.id+'/comments',
      type: 'GET',
      id: this.id
    }).done(view.showComments)
  }

  function createComment(evt){
    evt.preventDefault();
    var data = $('.create_comment').serialize();
    console.log(this)
    $.ajax({
      url: '/splashes/:id/comment',
      type: 'POST',
      data: data,
      success: function(returned_comment) {
        view.addNewComment(data);
      }
    })
  }

  function poll() {
    setTimeout(function () {
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/splashes',
        success: function(data) {
                  MyNamespace.myFunction(data); //DO ANY PROCESS HERE
                },
                complete: poll
              })
      }, 5000)                               //this is 5 seconds
  }

  function bindEvents(){
    $('.create_comment').on('submit', createComment);
    $('#splash_list').on('click','.splash', getComments);
    $('.container').on('submit','#create-splash-form', createSplash);
  }

  function updateCoords(){

  }
  return{
    createSplash: createSplash,
    createComment: createComment,
    poll: poll,
    bindEvents: bindEvents,
    updateCoords: updateCoords
  };
})();
