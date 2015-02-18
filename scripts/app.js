//setup splitter
var splitter = $('#splitter').kendoSplitter({
	panes: [
		{ collapsible: true, size: "25%" },
		{ collapsible: false}
	]
}).data('kendoSplitter');

//create TOC
jQuery('.toc').each(function(index){

	jQuery('h2','#toc'+(index+1)).each(function(i){
		//$(this).attr('id',$(this).text().replace(/ /g,'-'));
		$(this)
			.nextUntil('h3')
			.andSelf()
			.wrapAll('<div class="sec" id="'+$(this).text().replace(/ /g,'-')+'"></div>');
		$('#toc-padding')
			.append('<h5><a href="#'+($(this).text().replace(/[ .]/g,'-'))+'">'+$(this).html()+'</a></h5>');
	});

	jQuery('h3','#toc'+(index+1)).each(function(i){
		//$(this).attr('id',$(this).text().replace(/ /g,'-'));
		$(this)
			.nextUntil('h3')
			.andSelf()
			.wrapAll('<div class="sec" id="'+$(this).text().replace(/ /g,'-')+'"></div>');
		$('#toc-padding')
			.append('<h6><a href="#'+($(this).text().replace(/[ .]/g,'-'))+'">'+$(this).html()+'</a></h6>');
	});
	
});

jQuery('.chapter').each(function(index){
	jQuery('h2','#chapter'+(index+1)).each(function(i){
		var foo = index+1+'';
		//$(this).attr('id',((index+1)+($(this).text().replace(foo,'').replace(/ /g,'-'))));
		$(this)
			.wrap('<div class="sec" id="'+((index+1)+($(this).text().replace(foo,'').replace(/ /g,'-')))+'"></div>');
		$('#toc-padding')
			.append('<h5><a href="#'+(index+1)+($(this).text().replace(foo,'').replace(/ /g,'-'))+'">'+$(this).html()+'</a></h5>');
	});

	jQuery('h3','#chapter'+(index+1)).each(function(i){
		var foo = (index+1)+'.'+(i+1)+'';
		//$(this).attr('id',(index+1)+'.'+(i+1)+($(this).text().replace(foo,'').replace(/ /g,'-')));
		$(this)
			.nextUntil('h3')
			.andSelf()
			.wrapAll('<div class="sec" id="'+(index+1)+'.'+(i+1)+($(this).text().replace(foo,'').replace(/ /g,'-'))+'"></div>');
		$('#toc-padding').append('<h6><a href="#'+(index+1)+'.'+(i+1)+($(this).text().replace(foo,'').replace(/ /g,'-'))+'">'+$(this).html()+'</a></h6>');
	});  
});

//toggle
$( '#toggle-toc' ).on('click',function() {
	splitter.toggle('.k-pane:first');
	return false;
});
