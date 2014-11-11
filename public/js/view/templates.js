var template = (function(){

	function addSplash(params){
		var compiled = _.template('<li id="<%= id %>" class="splash inline-list"><div id="splash-created-on"><% bg %></div><%= name %><br><%= content %></p><ul id="comment-<%=id%>" class="comment-list"><li><form action="/splashes/<%=id%>/comment" method="post" class="submit_comment" id="submit_comment-<%=id%>"><input type="textarea" rows="4" cols="10" placeholder="Reply" name="content"></form></li><li role="presentation" class="divider"></li></ul></li>');
    string = compiled(params);
		return compiled(params);
	}


  function addModal(){
    var compiled = _.template('<div class="paulund_modal_box"><a href="#" class="paulund_modal_close"></a><div class="paulund_inner_modal_box"><form id="create-splash-form" action="/splashes" method="post"><label for="Create-Splash">Splash!</label><br><textarea id="modal_content" rows="4" cols="30" name="content" placeholder="255 Characters or Less"></textarea><br><input type="submit" class="btn btn-success" id="create_splash"><br></form></div></div>');
    return compiled();
  }

  function addComment(params){

    var compiled = _.template('<li role="presentation" class="divider"></li><li role="presentation"><%= name %></li><li role="presentation"><%= content %></li>');
      return compiled(params);
  }
  
  function addLogin(){
    var compiled = _.template('<div class="container-fluid"><div class="jumbotron" id="jumbotron"><h1>SoapBox</h1><p>Connect with people in your area</p><a href="/auth/facebook"><button type="button" class="btn btn-primary btn-lg">Login With Facebook</button></a><br></div></div>');
    return compiled();
  }
  
  // this shit doesn't work 
  function addHeader(){
    var compiled = _.template('<nav class="navbar navbar-inverse" role="navigation"><h3>SoapBox</h3></nav>'); 
      // <% if (current_user) { %><div class="logout"><a href="/logout">Logout</a></div><div class="logged-in-as">Logged in as: <span id="login_name"><%= @current_user.first_name %> <%= @current_user.last_name %></span></div><% } %> </nav>');
    return compiled();
  }
  
  function addSplashContainer(){
    var compiled = _.template('<div class="container"><div class="row"><div class="arrow_container col-md-1"><i class="fa fa-5x fa-chevron-left"></i></div><div class="x-hidden col-md-10"><ul id="splash_list" class="col-md-10"></ul></div><div class="arrow_container col-md-1"><i class="fa fa-5x fa-chevron-right"></i></div></div></div>');
    return compiled();
  }
  
  function addCreateSplashButton(){
    var compiled = _.template('<div class="create-new-splash-div"><a href="#" class="paulund_modal"><h3 class="new-splash-link">+New Splash</h3></div></a></div>');
    return compiled();
  }
  
	return {
		addSplash: addSplash,
    addModal: addModal,
    addComment: addComment,
    addHeader: addHeader,
    addLogin: addLogin,
    addSplashContainer: addSplashContainer,
    addCreateSplashButton: addCreateSplashButton
	};

})();
