// AJAX CALLS: 
// create splash and prepend to the front of the list. (PortfolioJS, SimplyScroll jquery plugin or MouseWheel Plugin)
// inserts comment to bottom of comments and removes comment box on submission of comment form 
// set timeout function to refresh the feed of splashes

// MODALS
// http://i-like-robots.github.io/jQuery-Modal/
// http://leanmodal.finelysliced.com.au/#

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
        data: data
      }).done(function(data){
        console.log(data);
        view.addNewSplash(data);
      });
    });
  }

  function createComment(){
    $('#create_comment').on('submit', function(evt){
    evt.preventDefault();
      $.ajax({
        url: '/splashes/:id/comment',
        type: 'POST',
        data: data
      }).done(function(data){
        view.addNewComment(data);
      });
    });
  }

  (function poll() {
      setTimeout(function () {
          $.ajax({
              type: 'POST',
              dataType: 'json',
              url: '',                          //add a URL
              success: function (data) {
                  MyNamespace.myFunction(data); //DO ANY PROCESS HERE
              },
              complete: poll
          });
      }, 30000);                                //this is 30 seconds
  })();
  

  return{
    createSplash: createSplash,
    createComment: createComment,
    poll: poll
  };
})();
