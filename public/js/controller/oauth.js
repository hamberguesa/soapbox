window.fbAsyncInit = function() {
    FB.init({
    appId      : '707092289381408',
    status     : true,
    cookie     : true,  // enable cookies to allow the server to access                         // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
    });
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
          url: 'http://soap-box-api.herokuapp.com/auth/facebook/callback',
          data: {signed_request: response.authResponse.signedRequest}
        }).done(loggedIn).fail(function(data){
          console.log("FAIL?");
          console.log(data);
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
    localStorage.setItem("user_id", "");
    FB.logout();
    loggedOut();

  }

  function loggedOut(){
    console.log("change login")
    controller.updateLoggedInStatus(true);
    controller.buildLoginPage();
    $('#logout').text("login");
    $('#logout').attr("onclick","oauth.login();");
  }

  function loggedIn(data){
    console.log("SUP")
    localStorage.setItem("user_id", data)
    controller.updateLoggedInStatus(true);
    controller.buildIndexPage();
    controller.poll();
    $('#logout').text("logout");
    $('#logout').attr("onclick","oauth.logout();");
  }

  function getLoginStatus(){
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        $.ajax({
          url: 'http://soap-box-api.herokuapp.com/auth/facebook/callback',
          data: {signed_request: response.authResponse.signedRequest}
        }).done(loggedIn).fail(function(){
          controller.updateLoggedInStatus(false);
          controller.buildLoginPage();
        });

      // the user has logged into facebook and authenticated our app
  } else if (response.status === 'not_authorized') {
      controller.updateLoggedInStatus(false);
    }
    // the user is logged in to Facebook,
    // but has not authenticated your app
  else {
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
