var template = (function(){

	function addSplash(params){
		var compiled = _.template('<li id="<%= id %>" class="splash"> <%= name %> <br> <%= content %> </li>')
		return compiled(params);
	}

  function addModal(){
    var compiled = _.template('<div class="paulund_modal_box"><a href="#" class="paulund_modal_close"></a><div class="paulund_inner_modal_box"><form id="create-splash-form" action="/splashes" method="post"><label for="Create-Splash">Splash!</label><br><textarea id="modal_content" rows="4" cols="30" name="content" placeholder="255 Characters or Less"></textarea><br><input type="submit" class="btn btn-success" id="create_splash"><br></form></div></div>')
    console.log(compiled())
    return compiled();
  }

	return {
		addSplash: addSplash,
    addModal: addModal
	}

})();
