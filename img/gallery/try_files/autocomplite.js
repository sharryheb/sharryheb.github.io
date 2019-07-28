$(function(){
	function createAutocompleteBlock(){
		var autocomplete = $("<ul></ul>").addClass("cat-autocomplete");
		autocomplete.css({
			'background': 'white',
			'border': '1px solid black',
			'min-width': '400px',
			'list-style': 'none',
			'padding': 0,
			'margin': 0,
			'position': 'absolute',
			'z-index':1000,
			'color':'black'
		});
		autocomplete.hide();
		autocomplete.appendTo(document.body);
		return autocomplete;
	}
	var autocomplete = createAutocompleteBlock();

	function positionAutocompleteBlock(elemPos){
		var elemOffset = elemPos.offset();
		var elemHeight = elemPos.height();
		autocomplete.css({
			'top': elemOffset.top + elemHeight + 2,
			'left': elemOffset.left
		});
	}

	function setAutocompleteValue(){
		if (currentInput) currentInput.val($(this).html());
	}

	function fillAutocompleteBlock(elems){
		autocomplete.empty();
		var elem, title, listElem;
		for (var i = 0, l = elems.length; i < l; i++){
			elem = elems[i].split(",");
			title = elem[0];
			listElem = $("<li></li>").html(title).css({
				'padding': '5px',
				'cursor': 'pointer'
			}).mousedown(setAutocompleteValue).appendTo(autocomplete);
		}
	}

	function blurAutocomplete(){
		currentInput = null;
		autocomplete.hide();
	}

	function focusAutocomplete(){
		currentInput = $(this);
		if ($(this).val().length >= 2) ajaxAutocomplete.apply(this);
	}

	function ajaxAutocomplete(){
		var self=$(this);
		var query=self.val();
		if (query.length >= 2){
			$.get('/', {
				module: 'posts/lists/search',
				act: 'autocomplite',
				query: query,
			}, function(data){
				if(data!=' '){
					fillAutocompleteBlock(data.split("|"));
					positionAutocompleteBlock(self);
					autocomplete.show();
				}
			});
		}
	}

	var currentInput = null;
	$(".search-input").keyup(ajaxAutocomplete).focus(focusAutocomplete).blur(blurAutocomplete);
}); 
