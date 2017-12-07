var iframe = $('#hero-player')[0];
var iframe2 = $('#case-study-player')[0];

var player = $f(iframe);
var player2 = $f(iframe2);

var offsetTrigger = 150;

$(document).ready(function(){

	initiateVideo();
    $('.slideshow .slide:nth-child(1)').addClass('active');

    if($(window).width() < 600) {
        offsetTrigger = 10;
    }

});

$("body").keydown(function(e) {
  if(e.keyCode == 37) { // left
    playLeft();
  }
  else if(e.keyCode == 39) { // right
    playRight();
  }
});

// $('#project-video-play').click(function(){
// 	$('#project-video').toggleClass('playing');
// });
function addEvent(element, eventName, callback) {
    
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    }
    else {
        element.attachEvent('on' + eventName, callback);
    }

}

var isPlaying = false;
var isPlaying2 = false;

function initiateVideo() {

    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function() {
        
        player.addEvent('pause', onPause);
        player.addEvent('play', onPlay);
        player.addEvent('finish', onFinish);

    });

    player2.addEvent('ready', function() {
        
        player2.addEvent('pause', onPause);
        player2.addEvent('play', onPlay);
        player2.addEvent('finish', onFinish);

    });

    $('#project-video-play, .pause-area').on('click', function(e) {
    	
    	e.stopPropagation();

    	if(isPlaying) {
    		player.api('pause');
    		isPlaying = false;
    	} else {
    		player.api('play');
    		isPlaying = true;
    	}

	});

    $('.video-wrapper-close, .close-video-2').on('click', function(e) {
        e.stopPropagation();

        $('#project-video, .case-study-content, .project-case-study-background').removeClass('playing');
        $('.video-wrapper-close').removeClass('show');
        $('.main-header').removeClass('out');

        player.api('pause');
        player2.api('pause');
        isPlaying = false;
        isPlaying2 = false;
    });

    $('.case-study-player-button, .case-study-content').on('click', function(e) {
        e.stopPropagation();
        console.log(isPlaying2);
        if(isPlaying2) {
            player2.api('pause');
            isPlaying2 = false;
        } else {
            player2.api('play');
            isPlaying2 = true;
        }
    })

};
var timeout = null;

$(document).on('mousemove', function() {
    if(!isPlaying && !isPlaying2) return;

    clearTimeout(timeout);
    $('.video-wrapper-close').addClass('show');
    timeout = setTimeout(function() {
        $('.video-wrapper-close').removeClass('show');
    }, 2000);
});

function onPlay() {

	$('#project-video, .case-study-content, .project-case-study-background').addClass('playing');
    $('.video-wrapper-close').addClass('show');

    $('.main-header').addClass('out');

}

function onPause() {


}

function onFinish() {

    $('#project-video, .case-study-content, .project-case-study-background').removeClass('playing');
    $('.video-wrapper-close').removeClass('show');
    $('.main-header').removeClass('out');

}

let slideLength = $('.slide').length;
let activeSlide = 1;
let isAnimating = false;

$('.slideshow-gallery, .right-arrow').click(function() {

    playRight();
    
});

function playRight() {

    $('.slideshow .slide:nth-child('+activeSlide+')').removeClass('active').addClass('leaving');
    removeSlide(activeSlide);

    activeSlide++
    $('.slideshow .slide:nth-child('+activeSlide+')').addClass('active');

    if(slideLength == activeSlide) {
        $('.slideshow .slide:nth-child('+activeSlide+')').removeClass('active').addClass('leaving');
        activeSlide = 1
        $('.slideshow .slide:nth-child('+activeSlide+')').addClass('active');
    }

}

function playLeft() {
    $('.slideshow .slide:nth-child('+activeSlide+')').removeClass('active').addClass('leaving');
    removeSlide(activeSlide);
    console.log(activeSlide);

    if(activeSlide == 1) {
        $('.slideshow .slide:nth-child('+activeSlide+')').removeClass('active').addClass('leaving');
        activeSlide = slideLength - 1;
        console.log(activeSlide);

        $('.slideshow .slide:nth-child('+activeSlide+')').addClass('active');

        return
    }

    activeSlide--
    $('.slideshow .slide:nth-child('+activeSlide+')').addClass('active');

}

$('.left-arrow').click(function(e) {

    e.stopPropagation();

    playLeft();

});

function removeSlide(activeSlide) {
    setTimeout(function() {$('.slide:nth-child('+activeSlide+')').removeClass('leaving')}, 1500)
}

$('.gallery-tile').click(function() {
    let index = $('.gallery-tile').index(this) + 1;

    if(index == activeSlide) return;
    $('.slideshow .slide:nth-child('+activeSlide+')').removeClass('active').addClass('leaving');
    removeSlide(activeSlide);

    activeSlide = index
    $('.slideshow .slide:nth-child('+activeSlide+')').addClass('active');

    if(slideLength == activeSlide) {
        $('.slideshow .slide:nth-child('+activeSlide+')').removeClass('active').addClass('leaving');
        activeSlide = 1
        $('.slideshow .slide:nth-child('+activeSlide+')').addClass('active');
    }

})

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height() - offsetTrigger;

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).on('scroll', function() {

  if(isScrolledIntoView('.animation-trigger-1')) {
    $('.project-header').addClass('show');
  }

  if(isScrolledIntoView('.animation-trigger-2')) {
    
    player.api('pause');
    player2.api('pause');
    
    $('#project-video, .case-study-content, .project-case-study-background').removeClass('playing');
    $('.video-wrapper-close').removeClass('show');
    $('.main-header').removeClass('out');

    $('.project-description').addClass('show');
  }

  if(isScrolledIntoView('.animation-trigger-3')) {
    $('.project-process').addClass('show');

    player2.api('pause');
    $('.case-study-content, .project-case-study-background').removeClass('playing');
  }

  if(isScrolledIntoView('.animation-trigger-4')) {
    $('.project-data').addClass('show');
    playNumbers();
  }

});

var options = {
  useEasing: true, 
  useGrouping: false, 
  separator: ',', 
  decimal: '.', 
};

let playedNumbers = false;

function playNumbers() {
    if(playedNumbers) return;

    $('.project-data-item-content').each(function() {
        let data = parseFloat($(this).attr('data-number'));
        let stat = new CountUp('stat-'+$(this).attr('data-target'), 0, data, 0, 3, options);
        stat.start()
    })
    playedNumbers = true;
}

