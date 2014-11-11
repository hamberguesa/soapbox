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
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
         $('#fb').attr("onclick","oauth.logout();");
         $('#fb').text("logout");
         user_id = response.id
       });
     } else {
       console.log('User cancelled login or did not fully authorize.');
     }
   });
  }

  function getData(){
    data = {user: user_id, token: token}
    return data
  }

  function logout(){
    $('#fb').text("login");
    $('#fb').attr("onclick","oauth.login();");


    FB.logout(function(response) {
      console.log(response)
      console.log("USER LOGGED OUT")
    // user is now logged out
  });
  }
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '707092289381408',
    cookie     : true,  // enable cookies to allow the server to access                         // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });
};

  return {
    login: login,
    logout: logout,
    getData: getData
  }
})();