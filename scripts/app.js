(function() {
	"use strict";

	var splitter = $( "#splitter" ).kendoSplitter({
		panes: [
			{ collapsible: true, collapsed: $( window ).width() < 700, size: "300px" },
			{ collapsible: false }
		]
	}).data( "kendoSplitter" );

	var toc = $( "#toc-padding" );
	$( ".chapter" ).each(function( chapterNumber ) {
		$( this ).find( "h2" ).each(function() {
			$( this ).prepend( "<strong>" + chapterNumber + ". </strong>" );
			toc.append( "<h5><a href='#chapter" + chapterNumber + "'>" +
				$( this ).html() + "</a></h5>" );
		});

		$( this ).find( "h3" ).each(function( sectionNumber ) {
			var hash = chapterNumber + "." + sectionNumber + "";
			$( this )
				.attr( "id", "chapter" + hash )
				.prepend( "<strong>" + hash + ". </strong>" );
			toc.append( "<h6><a href='#chapter" + chapterNumber + "." + sectionNumber + "'>" +
				$( this ).html() + "</a></h6>" );
		});
	});

	$( "#toggle-toc" ).on( "click",function() {
		splitter.toggle( ".k-pane:first" );
		return false;
	});
}());