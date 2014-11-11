window.fbAsyncInit = function() {
    FB.init({
    appId      : '707092289381408',
    cookie     : true,  // enable cookies to allow the server to access                         // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1', // use version 2.1
    status     : true
    });
    oauth.getLoginStatus();
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


var oauth = (function(){
  var token, user_id;
  function login(){
    FB.login(function(response) {
      if (response.authResponse) {
        token = response.authResponse.accessToken
        console.log(token)
        $.ajax({
          url: 'http://soap-box-api.herokuapp.com/auth/facebook/callback'
        }).done(function(data) {
        console.log("connected")
        console.log(data)
        });
      }
      else {
        console.log('User cancelled login or did not fully authorize.');
      }

        // FB.api('/me', function(response) 
        // {
        //   console.log('Good to see you, ' + response.name + '.');
        //   $('#fb').attr("onclick","oauth.logout();");
        //   $('#fb').text("logout");
        //   user_id = response.id
        //   data = {user_id: user_id, token: token}
        //   console.log('before')
        //   $.ajax({
        //     url: '/user/login',
        //     type: 'POST',
        //     data: data
        //   }).done(controller.checkLoggedInStatus); 

    });
  }
  function getData(){
    data = {user: user_id, token: token}
    return data
  }

  function logout(){
    $('#fb').text("login");
    $('#fb').attr("onclick","oauth.login();");

    $.ajax({
      url: '/user/logout',
      type: 'get'
    }).done(controller.checkLoggedInStatus)

    FB.logout(function(response) {
      console.log(response)
      console.log("USER LOGGED OUT")
  });
  }

  function getLoginStatus(){
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        $.ajax({
          url: 'http://soap-box-api.herokuapp.com/auth/facebook/callback'
        }).done(function(data) {
          console.log("connected")
          console.log(data)
          });
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
  } else {
    // the user isn't logged in to Facebook.
  }
  });
  }
  return {
    login: login,
    logout: logout,
    getData: getData,
    getLoginStatus: getLoginStatus,

  }
})();