$(document).ready(function() {

	if( !localStorage["hasLoadedBefore"] ) {

		$('.loading-container').addClass('show');

		setTimeout(function(){
			loadingSequence();
			localStorage["hasLoadedBefore"] = true;
		}, 3000)
	} else {
		loadingSequence();
	}
	
	highlightActiveLink();
});

function loadingSequence() {
	console.log('here');
	$('.loading-progress').addClass('part');
	if($('.load-image').length > 0) {
		setTimeout(function() {
			$('#global-wrapper, .main-header').show();
			$('.loading-progress').addClass('full');
		    $('body').removeClass('modal-open');
      		$('#loading-modal').removeClass('loading');
    	}, 300);
		$('.load-image').imageloader(
		  {
		    background: true,
		    callback: function (elm) {
		    	$('#global-wrapper, .main-header').show();
				$('.loading-progress').addClass('full');
		    	setTimeout(function() {
		      		$('#loading-modal').removeClass('loading');
		      		$('body').removeClass('modal-open');
					$('.loading-progress').removeClass('full part');
					$('#global-wrapper').removeClass('blur');
					$('.loading-container').removeClass('show');
		    	}, 500);
				if($('.parralax-image').length != 0) { $(window).paroller() } ;
		    }
		  }
		);
	} else {
		setTimeout(function() {
			$('#global-wrapper, .main-header').show();
			$('.loading-progress').addClass('full');
		    $('body').removeClass('modal-open');
      		$('#loading-modal').removeClass('loading');
			$('#global-wrapper').removeClass('blur');
    	}, 500);
	}
}

function highlightActiveLink() {
	var pathArray = window.location.pathname.split( '/' );
	console.log(pathArray[1]);

	if(pathArray[1] == '/') {

		return $('a.home').addClass('active');
	}
	if(pathArray[1] == 'work') {

		return $('a.work').addClass('active');
	}
	if(pathArray[1] == 'about') {

		return $('a.about').addClass('active');
	}
	if(pathArray[1] == 'contact') {
		return $('a.contact').addClass('active');
	}
}

$('.load').click(function(e){

	e.preventDefault();
	$(this).addClass('active');
	$('#loading-modal').addClass('loading');

	setTimeout(() => {
		$('#global-wrapper').addClass('blur');
		window.location = $(this).attr('href');
	}, 500);
});

$('.work-btn').click(function(){
	$('body').addClass('modal-open');

	setTimeout(function() {
		$('#global-wrapper').addClass('blur');
		$('.work-modal').addClass('show');
	}, 100)

	setTimeout(listWorkItems(), 150);
})

$('.work-modal').click(function(){
	$('#global-wrapper').removeClass('blur');
	$('.work-modal').removeClass('show');
	$('.work-list-item').removeClass('show');
	setTimeout(function() {
		$('body').removeClass('modal-open');
	}, 100)
})

function listWorkItems() {
	var linkCount = 1;
	var linkLength = $('.work-list-item').length;

	var linkInterval = setInterval(function(){
		if(linkCount <= linkLength) {
			$('.work-list-item:nth-child('+linkCount+')').addClass('show');
			linkCount++;
		} else {
			clearInterval(linkInterval);
		}
	}, 100);
}

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('.contact-form, #privacy').removeClass('show');
		$('#global-wrapper').removeClass('blur');

		$('#global-wrapper').removeClass('blur');
		$('.work-modal').removeClass('show');
		$('.work-list-item').removeClass('show');
		setTimeout(function() {
			$('body').removeClass('modal-open');
		}, 100)

		setTimeout(function() {
			$('body').removeClass('modal-open');
			$('.close-modal').addClass('loaded');
		}, 100)
    }
});

$('.page-up').click(function() {
	$('html, body').animate({ scrollTop: 0 }, 1300);
});

$('.open-contact').click(function(e){

	$('body').addClass('modal-open');
	e.preventDefault();
	setTimeout(function() {
		$('.close-modal').removeClass('loaded');
	}, 1000)
	$('.contact-form').addClass('show');
	$('#global-wrapper').addClass('blur');
});

$('.close-modal').click(function() {
	$('.contact-form, #privacy').removeClass('show');
	$('#global-wrapper').removeClass('blur');

	setTimeout(function() {
		$('body').removeClass('modal-open');
		$('.close-modal').addClass('loaded');
	}, 100)
})

$('.privacy-click').click(function(e) {
	$('body').addClass('modal-open');
	setTimeout(function() {
		$('.close-modal').removeClass('loaded');
	}, 1000)
	e.preventDefault();	

	$('#privacy').addClass('show');
	$('#global-wrapper').addClass('blur');
});

$('.work-list-item').hover(function() {
	let target = $(this).attr('data-target');

	$('#'+target).addClass('active');
}, function() {
	$('.work-menu-background').removeClass('active');
});
