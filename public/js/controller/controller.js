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

    $.ajax({
      url: '/splashes',
      type: 'POST',
      data: data
    }).done(view.addNewSplash)
    $('.paulund_block_page').fadeOut().remove();
  }

  function getComments(evt){
    if(evt.target !== this)
      return;
    view.showComments(this.id);
  }

  function createComment(evt){
    evt.preventDefault();
    id = $(this).parent().parent().parent()[0].id
    var data = $(this).serialize();
    $.ajax({
      url: '/splashes/'+id+'/comment',
      type: 'POST',
      data: data
      }).done(view.addNewComment)
    $(this)[0].elements.content.value = ""
    }

    // var data = $('#create-splash-form').serialize();
  function poll() {
    setTimeout(function () {
      var data = $(this);

      $.ajax({
        url: '/splashes',
        success: function(data) {
                // make this function update the splashes every five seconds
                // model.getSplashes
                console.log(data)
                },
                complete: poll
              })
      }, 5000)     //this is 5 seconds
  }

  function updateCoords(){

  }

  function bindEvents(){
    view.addColors();
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

controller.poll()
