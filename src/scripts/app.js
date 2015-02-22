(function() {
	"use strict";

	FastClick.attach( document.body );

	function isMobile() {
		return $( window ).width() <= 700;
	}

	// TODO: Don't do this in JS. Ugh.
	if ( isMobile() ) {
		$( "body" ).addClass( "no-toc" );
	}

	// Build the TOC
	var toc = $( "#toc-padding" );
	$( ".chapter" ).each(function( chapterNumber ) {
		$( this ).find( "h2" ).each(function() {
			$( this )
				.attr( "id", "chapter" + chapterNumber )
				.prepend( "<strong>" + chapterNumber + ". </strong>" );
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

	$( "code.lang-markup, code.lang-javascript" )
		.each(function() {
			var text = $( this ).text();
			$( this ).text( text.trim() );
		})
		.parent( "pre" )
		.addClass( "line-numbers" );

	$( "#toggle-toc" ).on( "click", function() {
		$( "body" ).toggleClass( "no-toc" );
		return false;
	});
	$( "#toc" ).on( "click", "a", function() {
		if ( isMobile() ) {
			$( "body" ).addClass( "no-toc" );
		}
	});
}());
