(function() {
	"use strict";

	var splitter = $( "#splitter" ).kendoSplitter({
		panes: [
			{ collapsible: true, size: "25%" },
			{ collapsible: false }
		]
	}).data( "kendoSplitter" );

	var toc = $( "#toc-padding" );
	$( "div[id*=chapter]" ).each(function( chapterNumber ) {
		$( "h2", "#chapter" + chapterNumber ).each(function( i ) {
			toc.append( "<h5><a href='#chapter" + chapterNumber + "'>" +
				$( this ).html() + "</a></h5>" );
		});

		$( "h3", "#chapter" + chapterNumber ).each(function( i ) {
			var hash = chapterNumber + "." + ( i + 1 ) + "";
			toc.append( "<h6><a href='#chapter" + chapterNumber + "." + ( i + 1 ) + "'>" +
				$( this ).html() + "</a></h6>" );
		});
	});

	$( "#toggle-toc" ).on( "click",function() {
		splitter.toggle( ".k-pane:first" );
		return false;
	});
}());