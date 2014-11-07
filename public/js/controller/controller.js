// AJAX CALLS: 
// create splash and prepend to the front of the list. (PortfolioJS, SimplyScroll jquery plugin or MouseWheel Plugin)
// inserts comment to bottom of comments and removes comment box on submission of comment form 
// set timeout function to refresh the feed of splashes

// SLIDEDOWN MENU FOR COMMENTS
// slideDown when user wants to create a comment
// http://www.alessioatzeni.com/blog/signin-dropdown-box-like-twitter-with-jquery/
// http://alexsblog.org/2014/08/21/custom-html-dropdown-with-jquery/

var controller = (function(){
 
  function createSplash(){
    $('#create_splash').on('click', function(evt){
      evt.preventDefault();
      var data = $('#create_splash').serialize();
      $.ajax({
        url: '/splash',
        type: 'POST',
        data: data,
        success: function(returned_splash) {
          view.addNewSplash(data);
        }
      });
    });
  };

  function createComment(){
    $('#create_comment').on('submit', function(evt){
    evt.preventDefault();
    var data = $('#create_comment').serialize();
      $.ajax({
        url: '/splashes/:id/comment',
        type: 'POST',
        data: data, 
        success: function(returned_comment) {
          view.addNewComment(data);
        }
      });
    });
  };

  (function poll() {
      setTimeout(function () {
          $.ajax({
              type: 'GET',
              dataType: 'json',
              url: '/splashes',                        
              success: function(data) {
                  MyNamespace.myFunction(data); //DO ANY PROCESS HERE
              },
              complete: poll
          });
      }, 5000);                                //this is 5 seconds
  })();
  
  return{
    createSplash: createSplash,
    createComment: createComment,
    poll: poll
  };
})();
