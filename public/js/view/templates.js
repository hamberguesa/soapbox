var template = (function(){

	function addSplash(params){
		var compiled = _.template('<li id="<%= id %>" class="splash"> <%= name %> <br> <%= content %> </li>')
		return compiled(params)
	}


	return {
		addSplash: addSplash
	}

})();