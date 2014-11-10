var template = (function(){

	function addSplash(params){
		var compiled = _.template('<li id="<%= id %>" class="splash inline-list"><p> <%= time_ago %><br><%= name %> <br> <%= content %></p><ul id="comment-<%=id%>" class="comment-list"><li><form action="/splashes/<%=id%>/comment" method="post" class="submit_comment" id="submit_comment-<%=id%>"><input type="textarea" rows="4" cols="10" placeholder="Reply" name="content"></form></li><li role="presentation" class="divider"></li></ul></li>')
    string = compiled(params);
		return compiled(params);
	}


  function addModal(){
    var compiled = _.template('<div class="paulund_modal_box"><a href="#" class="paulund_modal_close"></a><div class="paulund_inner_modal_box"><form id="create-splash-form" action="/splashes" method="post"><label for="Create-Splash">Splash!</label><br><textarea id="modal_content" rows="4" cols="30" name="content" placeholder="255 Characters or Less"></textarea><br><input type="submit" class="btn btn-success" id="create_splash"><br></form></div></div>');
    return compiled();
  }

  function addComment(params){

    var compiled = _.template('<li role="presentation" class="divider"></li><li role="presentation"><%= name %></li><li role="presentation"><%= content %></li>');
      return compiled(params)
  }

	return {
		addSplash: addSplash,
    addModal: addModal,
    addComment: addComment
	}

})();
