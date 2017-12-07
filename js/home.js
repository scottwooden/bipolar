jQuery(document).ready(function ($) {
    if( !localStorage["hasLoadedBefore"] ) {
        setTimeout(function() {

            initiateSlider();
    
        }, 3000)
    } else {
        initiateSlider();
    }
}); 

function initiateSlider() {
    $(".rslides").responsiveSlides({
        pager: true,
        nav: true,
        prevText: '',
        nextText: '',
    });
    setTimeout(function() {
        resetBars();
    }, 300)
}   

function resetBars() {
	$('.rslides_tabs li').addClass('overide');
	setTimeout(function() {
		$('.rslides_tabs li').removeClass('overide');
	}, 10)
}
