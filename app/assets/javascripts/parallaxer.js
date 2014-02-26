function aParallax(){
	var p = this;
	p.panelWd = 400; // the width of the primary panel
	p.otherLayers = [{ id: 'layerA', ratio: 0.75 },{ id: 'layerC', ratio: 1.25 },{ id: 'layerD', ratio: 1.5 },{ id: 'layerE', ratio: 1.75 }]; // all of the other panels
	p.panelCount = $('#layerB .p').length; // the total number of panels

	p.didScroll = false;
	p.panelHovered = 0; // current panel being hovered; will change as soon as the scripts start firing

	p.overflowControl = $('#overflowControl'); // we will be dealing with this one enough to warrant putting it in its own var

	// all methods will go here as well as constructor code
    this.crunchWinVars = function(){
    	p.winWd = $(window).width();
    	p.winHoriSp2Panel = Math.floor( ( p.winWd - p.panelWd ) / 2 );
    	$('#layerSling').offset({ left: p.winHoriSp2Panel });
    	p.overflowControl.width( p.winWd + (p.panelCount-1) * p.panelWd );
    };

    this.init = function(){
    	$('#layerB').width( p.panelCount * p.panelWd ); // This might be better to bake into style tags serverside
    	for(var ih=0; ih<p.otherLayers.length; ih++){
    		p.otherLayers[ih].ref = $('#'+p.otherLayers[ih].id); // we will be referencing these a lot
    		$( p.otherLayers[ih].ref ).width( Math.ceil(p.panelCount * p.panelWd * p.otherLayers[ih].ratio) ); // This might be better to bake into style tags serverside
    		$( '#'+p.otherLayers[ih].id+' .p' ).width( Math.round( p.panelWd * p.otherLayers[ih].ratio) ); // This might be better to bake into css
    		$( '#'+p.otherLayers[ih].id+' .p' ).text( Math.round( p.panelWd * p.otherLayers[ih].ratio) ); // Helper line
    		p.parallax(p.otherLayers[ih].ref, p.otherLayers[ih].ratio);
    	}
    };

    this.parallax = function (containerRef, ratio){
    	containerRef.css({ left : (1 - ratio) * ( p.panelWd / 2 + $(window).scrollLeft() ) +'px' });
    }

    p.crunchWinVars();
    p.init();
    
    this.panelNarr = function(aPanel){
    	var elevator = $('#panelControl a[href="'+aPanel+'"]');
    	var narrative = $(aPanel+' .narrative');
    	var overflowNewHt = narrative.outerHeight() + 500;

    	$('.narrative:visible').stop(true,true).slideUp(100); // roll up text for other slides, if any are unfurled
    	if( !elevator.hasClass('clicked') ) elevator.addClass('clicked'); // add clicked class to the panelControl for page that we just passed by

    	if( overflowNewHt > p.overflowControl.outerHeight() )
    		p.overflowControl.animate( {'height' : overflowNewHt}, 200, 'easeInOutSine' );
    	narrative.slideDown(500); // unfurl narrative

    	if( p.winWd != $(window).width() ) p.crunchWinVars(); // sometimes extending the overflow adds the vertical scrollbar, so we need to account for that
    };

    this.panelControl = function(){
    	$('#panelControl a').click(function(elevator){
    		elevator.preventDefault();
    		p.correctScroll($(this).attr('href'));
    	});
    }

    this.correctScroll = function (hash, duration){
    	if(duration === undefined) var duration = 8345;
    	if($(window).scrollTop()) $.scrollTo( hash, { 'axis' : 'y', 'queue' : true, 'duration' : Math.floor($(window).scrollTop() * 3/2 + 200), 'offset' : { 'top' : -90 } }); // scrollTo will take forever scrolling up if we have x & y queued in a single line, so doing it separately allows us to have a brisker upscroll and a longer side one
    	$.scrollTo( hash, { 'axis' : 'x', 'queue' : true, 'duration' : duration, 'offset' : { 'left' : -p.winHoriSp2Panel }, 'easing' : 'easeInOutSine' });
    }

    p.panelControl();
    
	$(window).resize(function(){
		// here we'll add all the stuff we need to fire when the window is resized
		 p.crunchWinVars();
	});

	$(window).scroll(function(){
		p.didScroll = true;
	});

	setInterval(function() {
		if ( p.didScroll ) {
			p.didScroll = false;
			// all things that are affected by scrolling get executed here
			for(var ih=0; ih<p.otherLayers.length; ih++){
            	p.parallax(p.otherLayers[ih].ref, p.otherLayers[ih].ratio);
            }
            panelEventSniffer();
		}
	}, 30);
}

$(document).ready(function(){
	// execute when all code loads
	p = new aParallax();
});


