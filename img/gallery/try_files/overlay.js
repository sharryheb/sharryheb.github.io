(function(){
	var overlay={
		wrapperClass:'.overlay'	,
		elementClass:'.overlay-enable',
		setEventHashChange:setEventHashChange,
		setHash:setHash,
		open:getOverlay,
		render:renderOverlay,
		close:closeOverlay
	};

	function getOverlay(){
		var hash=window.location.hash;
		let params=hash.match(/(gal|overlayGallery.*)_(.+)_(\d+)_(.+)$/);
		if(params==null) return;
		let view=params[1]!='gal'?params[1]:'';
		let tbl=params[2];
		let pid=params[3];
		let imgUrl=params[4];
		//подгружаем галерею
		$.post(
			frameworkFrontend.basepath+"?module=gallery",
			{act: 'overlayGallery', tbl: tbl, pid: pid, url: imgUrl, view: view},
			function(data){
				if(data==''){
					window.location.hash=''; return;
				}
				$(overlay.wrapperClass).remove();
				overlay.render(data);
			}
		);

		$('body').keydown(function (obj) {
			if (obj.which == 27)
				overlay.close();
		});
	};

	function renderOverlay(html){
		var o=this;
		$('body').css('overflow', 'hidden');
		$('body').append('<div class="overlay"></div>');
		$(this.wrapperClass).css('height', '100%');
		$(this.wrapperClass).html(html);
		$(this.wrapperClass).find('#overlayClose').click(function(){
			o.close();
		});
	}

	function setHash(clickedElement){
		let dataView=($(clickedElement).attr('data-view')?$(clickedElement).attr('data-view'):'gal');
		window.location.hash=dataView+'_'+$(clickedElement).attr('data-tbl')+'_'+$(clickedElement).attr('data-pid')+'_'+encodeURI($(clickedElement).attr('data-url'));
	}

	function setEventHashChange(){
		//unbind previos event listner, if exists
		$(window).unbind('hashchange');
		$(window).unbind('onhashchange');
		//bind hashchange event listner
		$(window).bind('hashchange', this.open);
		$(window).bind('onhashchange', this.open);
	}

	function closeOverlay() {
		$(this.wrapperClass).fadeOut(300, function () {
			$(this.wrapperClass).remove();
		});
		if ($('body').css('overflow') === 'hidden') {
			$('body').css('overflow', 'auto');
		}
		window.location.hash='1';
		return false;
	}

	$(document).ready(function () {
		overlay.setEventHashChange();
		$(overlay.elementClass).each(function (indx) {
			$(this).unbind('click');
			$(this).click(function () {
				overlay.setHash(this);
				//overlay.open();
				return false;
			});
		});
		// try open overlay if is not exists yet
		if(!$(overlay.wrapperClass).length)
			overlay.open();
	});
})();