(function(){
	var appendFunc=function() {
		var wrapper=$('.work');
		if($(window).scrollTop() >= $(document).height() - $(window).height() - $('footer').height() - 300) {
			var offset=wrapper.find('.cardNum').length;
			var keyword=wrapper.data('keyword');
			var num=wrapper.data('num');
			console.log('query for append ofset:'+offset);
			$.post(window.location.basepath+'?module=posts/keywords',
				{
					act:'infinityGallery',
					offset:offset,
					keyword:keyword,
					num:num
				},
				function(response){
					if(response) {
						wrapper.append(response);
						widthCorrector();
						//reset event
						$(window).scroll(appendFunc);
					}
				}
			);
			//unbind event
			$(window).unbind('scroll',appendFunc);
		}
	}

	//set event
	$(window).scroll(appendFunc);
})();
