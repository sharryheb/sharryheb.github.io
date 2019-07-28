(function(){
	widthCorrector();
})();

function widthCorrector(){
	var pagewidth=$('.work').width();
	if(pagewidth<=300) return;
	var blockcount=Math.floor(pagewidth/220);
	var blockwidth=pagewidth/blockcount;
	$('.work .card').css({'width':blockwidth});
}

function makepin(clickedEl){
	var imid=$(clickedEl).data('id');
	console.log(imid);
	$.post(window.location.basepath+'?module=posts/lists/rating',
		{act:'pin', imid:imid},
		function(){
			$(clickedEl).detach();
		}
	);
}