// var frameNumber = 0, // start video at frame 0
//     // lower numbers = faster playback
//     playbackConst = 200, 
//     // get page height from video duration
//     setHeight = document.getElementById("set-height"), 
//     // select video element         
//     vid = document.getElementById('v0'); 
    // var vid = $('#v0')[0]; // jquery option

// dynamically set the page height according to video length
// vid.addEventListener('loadedmetadata', function() {
//   setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
// });
// 
var vid = document.getElementById('v0');

// 
$(document).ready(function() {
  $('.intro-animation-1').addClass('show');

  vid.pause();
 
  // pause video on document scroll (stops autoplay once scroll started)
  window.onscroll = function(){
      vid.pause();
  };

  // refresh video frames on interval for smoother playback
  setInterval(function(){
    TweenMax.to(vid,2,{currentTime:window.pageYOffset/400});
  }, 40);
})

$('.arrow-separator').click(function() {
  $('html, body').animate({ scrollTop: 800 }, 1300);
});


// Use requestAnimationFrame for smooth playback
// function scrollPlay(){  
//   var frameNumber  = window.pageYOffset/playbackConst;
//   vid.currentTime  = frameNumber;
//   window.requestAnimationFrame(scrollPlay);
// }

// window.requestAnimationFrame(scrollPlay);

// select video element
//var vid = $('#v0')[0]; // jquery option

// pause video on load


function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height() - 300;

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).on('scroll', function() {

  if(isScrolledIntoView('.trigger-2')) {
    $('.intro-animation-2').addClass('show');
  }

  if(isScrolledIntoView('.trigger-3')) {
    $('.intro-animation-3').addClass('show');
  }

  if(isScrolledIntoView('.trigger-4')) {
    $('.intro-animation-4').addClass('show');
  }

  if(isScrolledIntoView('.trigger-5')) {
    $('.intro-animation-5').addClass('show');
  }

  if(isScrolledIntoView('.trigger-6')) {
    $('.intro-animation-6').addClass('show');
  }

})