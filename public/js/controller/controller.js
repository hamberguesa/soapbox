// AJAX calls: Will call View functions
// create splash and prepend to the front of the list. (PortfolioJS, SimplyScroll jquery plugin or MouseWheel Plugin)
// http://i-like-robots.github.io/jQuery-Modal/
// http://leanmodal.finelysliced.com.au/#
// set timeout function to refresh the feed of splashes
// slideDown when user wants to create a comment
// inserts comment to bottom of comments and removes comment box on submission of comment form 

var controller = (function(){
  
  // when create splash is pressed on modal page -> .on('submit', function(e){
    e.preventDefault();
  $.ajax({
    url: '/splashes',
    type: 'POST',
    data: data
  }).done(function(data){
    // call the view function for the modal
  });
    
  //});
  

  return{
 
  };
})();
