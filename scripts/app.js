SyntaxHighlighter.defaults['toolbar'] = false;
SyntaxHighlighter.all();

function lineWrap(){
	var wrap = function () {
		var elems = document.getElementsByClassName('syntaxhighlighter');
		for (var j = 0; j < elems.length; ++j) {
			var sh = elems[j];
			var gLines = sh.getElementsByClassName('gutter')[0].getElementsByClassName('line');
			var cLines = sh.getElementsByClassName('code')[0].getElementsByClassName('line');
			var stand = 15;
			for (var i = 0; i < gLines.length; ++i) {
				var h = $(cLines[i]).height();
				if (h != stand) {
					gLines[i].setAttribute('style', 'height: ' + h + 'px !important;');
				}
			}
		}
	 };
	var whenReady = function () {
		if ($('.syntaxhighlighter').length === 0) {
			setTimeout(whenReady, 800);
		} else {
			wrap();
		}
	};
	whenReady();
};
lineWrap();

$(window).resize(function(){lineWrap()});

$('#book a').attr('target', '_blank');

//setup splitter
var splitter = $('#splitter').kendoSplitter({
	panes: [
		{ collapsible: true, collapsed: true},
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

//detect and reset panels for phones, tablets, and desktop
$(window).setBreakpoints({distinct: true, breakpoints: [320,480,768,1024] });

$(window).on('enterBreakpoint320',function() {
	$('h1').css('width','200px');
	splitter.size('.k-pane:first', '70%');
	splitter.size('.k-pane:last', '30%');
	splitter.toggle('.k-pane:first',false);
});
$(window).on('enterBreakpoint480',function() {
	$('h1').css('width','350px');
	splitter.size('.k-pane:first', '40%');
	splitter.size('.k-pane:last', '60%');
	splitter.toggle('.k-pane:first',false);
});
$(window).on('enterBreakpoint768',function() {
	$('h1').css('width','600px');
	splitter.size('.k-pane:first', '20%');
	splitter.size('.k-pane:last', '80%');
	splitter.toggle('.k-pane:first',false);
});
$(window).on('enterBreakpoint1024',function() {
	$('h1').css('width','700px');
	splitter.size('.k-pane:first', '25%');
	splitter.size('.k-pane:last', '75%');
	splitter.toggle('.k-pane:first',true);
});

//toggle
$( '#toggle-toc' ).on('click',function() {
	splitter.toggle('.k-pane:first');
	if($('#book')[0].scrollTop > 0){
		$('#toc-padding a.active').first()[0].scrollIntoView(true);
	}
	return false;
});

window.setTimeout(function(){

	$('.sec')
	.waypoint(function(direction) {
		var $links = $('#toc-padding a[href="#' + this.id + '"]');
		$links.toggleClass('active', direction === 'down');
		}, {
		context: '#book',
		offset: '100%'
	})
	.waypoint(function(direction) {
		var $links = $('#toc-padding a[href="#' + this.id + '"]');
		$links.toggleClass('active', direction === 'up');
		}, {
		context: '#book',
		offset: function() {
		  return -$(this).height();
		}
	});

	
	if($('#book')[0].scrollTop > 0){
		$('#toc-padding a.active').first()[0].scrollIntoView(true);
	}

	$('#book').scroll(function(){
		if($('#book')[0].scrollTop === 0){
			$('#toc')[0].scrollTop = 0;
		}else{
			$('#toc-padding a.active').first()[0].scrollIntoView(true);
		}
	});

	$(window).resize(function(event) {
		$.waypoints('refresh');
	});

},2000);

window.setTimeout(function(){ 
	if(window.location.hash === ''){
	$( '#toggle-toc' ).trigger('click');
	}
}, 5000);