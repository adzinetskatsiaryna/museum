// video player
const progressVideo = document.querySelector('.progress-video');
const progressVolume = document.querySelector('.progress-volume');
const btnVolume = document.querySelector('.volume')
const video = document.querySelector('.video');
const buttonPlayMain = document.querySelector('.btn-play-main');
const btnPlayPause = document.querySelector('.play');
const btnFullScreen = document.querySelector('.btn-full-screen')
let volumeValue = 40 ;
progressVolume.value = volumeValue;

function toggleVideoStatus() {
    if (video.paused) {    
      video.play();
    } else {      
      video.pause();  
    }
};

function updateIcon() {
    if (video.paused) {
      btnPlayPause.classList.add('play');
      btnPlayPause.classList.remove('pause');
      buttonPlayMain.classList.add('btn-play-main')
      buttonPlayMain.classList.remove('button-main-hidden')
     
    } else {
      btnPlayPause.classList.add('pause');
      btnPlayPause.classList.remove('play');
      buttonPlayMain.classList.add('button-main-hidden')
      buttonPlayMain.classList.remove('btn-play-main')
      
    }
};

function videoVolume(){
  if (progressVolume.value === 0) {
		video.volume = 0;
	}
	video.volume = progressVolume.value / 100;  
}
video.addEventListener('timeupdate', videoVolume);

progressVolume.addEventListener('input', function(){
  const value = this.value
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  if(value==0){
    btnVolume.classList.add('mute')
    btnVolume.classList.remove('volume')
  } else{
    btnVolume.classList.add('volume')
    btnVolume.classList.remove('mute') 
  }
})

function videoMute() {

  if (progressVolume.value > 0) {
    volumeValue = progressVolume.value;
    btnVolume.classList.add('mute')
    btnVolume.classList.remove('volume')
    progressVolume.value=0
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #C4C4C4 0%, #C4C4C4 0%, #C4C4C4 100%)`
    progressVolume.transition = '0.25s ease-in-out'
    
  } else if(progressVolume.value == 0 && volumeValue > 0){
    btnVolume.classList.remove('mute');
    btnVolume.classList.add('volume'); 
    progressVolume.value = volumeValue;
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707  ${volumeValue}%, #C4C4C4 ${volumeValue}%, #C4C4C4 100%)`  
  } else{
    volumeValue = 40;
    btnVolume.classList.remove('mute'); 
    btnVolume.classList.add('volume');
    progressVolume.value = volumeValue;
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volumeValue}%, #C4C4C4 ${volumeValue}%, #C4C4C4 100%)`  
  }
}
btnVolume.addEventListener('click', videoMute);


function fullscreen() { // Переключатель полноэкранного режима
  if (!document.fullscreenElement) {
    document.querySelector('.video-player').requestFullscreen();
    btnFullScreen.classList.remove('btn-full-screen');
    btnFullScreen.classList.add('btn-out-full-screen');
    document.querySelector('.player-controls').style.height='8vh';
    document.querySelector('.player-controls').style.padding = '0px'
    video.style.height='92vh';
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      btnFullScreen.classList.remove('btn-out-full-screen');
      btnFullScreen.classList.add('btn-full-screen');
      document.querySelector('.player-controls').style.height='';
      document.querySelector('.player-controls').style.padding = '25px 0px'
      mainVideo.style.height='';
    }
  }
}


function stopVideo() {
    video.currentTime = 0;
    setProgressTimer();
    video.pause();
};

function setProgressTimer() {
    progressVideo.value = (video.currentTime / video.duration) * 100;
    if (video.currentTime === video.duration) {
      progressVideo.value = 0;
      stopVideo();
    }
    progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVideo.value}%, #C4C4C4 ${progressVideo.value}%, #C4C4C4 100%)`
};

function seeked() {
    video.currentTime = (progressVideo.value / 100) * video.duration;
    let value = progressVideo.value
    if(video.currentTime){
      progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
    }
    
}

const videoSpeedBlock = document.querySelector('.video-speed')
function clearOpacity(){
  let opacity = 1;
  setTimeout(function changeOpacity() {
    if(opacity < 0) return;
    videoSpeedBlock.setAttribute('style', `opacity: ${opacity}`);
    opacity = (opacity - 0.1).toFixed(1);
    setTimeout(changeOpacity, 120);
  }, 120);
}

function keyPressVideo(e){
    if(e.target.tagName === 'INPUT'){
      return
    } else if (e.keyCode === 32 ) {
      e.preventDefault() 
      toggleVideoStatus();
    } else if (e.key === 'm' || e.key === 'M') { 
      videoMute();
    } else if (e.key === 'f' || e.key === 'F') { 
      fullscreen();
    }  else if (e.key === '>' || e.key === 'Ю') { 
      if (video.playbackRate >= 5.75) {
        video.playbackRate = 6;
      }else 
        video.playbackRate += 0.25;
        videoSpeedBlock.innerHTML = `x${video.playbackRate}` 
        videoSpeedBlock.classList.add('active')
        clearOpacity()
    } else if (e.key === '<' || e.key === 'Б') { 
      if (video.playbackRate >= 0.5) {
        video.playbackRate -= 0.25;
        videoSpeedBlock.innerHTML = `x${video.playbackRate}` 
        videoSpeedBlock.classList.add('active')
        clearOpacity()
      } else {
        video.playbackRate = 0.25;
      }
    } else if (e.key === 'n' || e.key === 'N' || e.key === 'т' || e.key === 'Т') {
      video.playbackRate = 1;
    } else if (e.key >= 0 && e.key <= 9) {
      video.currentTime = (video.duration / 10) * e.key;
    }
}

document.addEventListener("keypress", (e) => keyPressVideo(e));  

document.addEventListener('keydown', function (e) {
	if (e.code == 'ArrowRight') {
		video.currentTime += 5;
	}
	if (e.code == 'ArrowLeft') {
		video.currentTime -= 5;
	}
})



btnPlayPause.addEventListener('click', toggleVideoStatus);
buttonPlayMain.addEventListener('click', toggleVideoStatus);
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', setProgressTimer);
progressVideo.addEventListener('input', seeked);
btnFullScreen.addEventListener('click', fullscreen);

// sliderVideo
const carousel = document.querySelector('.slider');
const slideList = document.querySelectorAll('.slider-list');
const next = document.querySelector('.next-video');
const prev = document.querySelector('.prev-video');
const items=document.querySelectorAll('.slider-item');
const dots = document.querySelectorAll('.video-dot');
const activeVideo = document.querySelector('.active-video')
const innerCarousel = document.querySelector('.inner-carousel')

const gap = 40;
let slideIndex=0;
let numberOfItems=Array.from(items).length -3;

let width = carousel.offsetWidth;
let videoWidth=document.querySelector('.slider-item').offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

function newVideo(index){
  
  innerCarousel.scrollTo((videoWidth + gap)*index, 0); 
}

function activeDot (index) {
  for (dot of dots) {
    dot.classList.remove('active-dot');
  }
  dots[index].classList.add('active-dot');
};

function onChangeSlideVideo(i){
  newVideo(i)
  activeDot(i)
  activeVideo.src=videos[i].video
  video.poster=videos[i].poster
  video.load()
}

function nexSlide(){
  if(slideIndex >= numberOfItems ){
    slideIndex=0;
  }else{
    slideIndex ++ 
  } 
  onChangeSlideVideo(slideIndex)
}
function prevSlide (){
  if(slideIndex <= 0){
    slideIndex = numberOfItems;
  }else{
    slideIndex --
  } 
  onChangeSlideVideo(slideIndex)
}

dots.forEach((dot, indexDot) => {
  dot.addEventListener('click', () => {
    slideIndex = indexDot;
    onChangeSlideVideo(slideIndex)
  });
});
items.forEach((item, slideIndex)=>{
  item.addEventListener('click', ()=>{
    onChangeSlideVideo(slideIndex)
  })
})

next.addEventListener("click", nexSlide);
prev.addEventListener("click", prevSlide);

const videos= [
  {
    slideIndex: 0,
    video: './assets/video/video.mp4',
    poster: './assets/img/video-posters/video_bg.jpg', 
  },
  {
    slideIndex: 1,
    video: './assets/video/video1.mp4',
    poster: './assets/img/video-posters/poster1.jpg'    
  },
  {
    slideIndex: 2,
    video: './assets/video/video2.mp4',
    poster: './assets/img/video-posters/poster2.jpg',   
  },
  {
    slideIndex: 3,
    video: './assets/video/video3.mp4',
    poster: './assets/img/video-posters/poster3.jpg',
  },
  {slideIndex: 4,
    video: './assets/video/video4.mp4',
    poster: './assets/img/video-posters/poster4.jpg',   
  }
];



const players = [];

function onYouTubeIframeAPIReady() {
    players[0] = new YT.Player('player0', {
        events: {
          'stopVideo': stopYotubVideo,
            'onStateChange': onPlayerStateChange
        }
    });
    players[1] = new YT.Player('player1', {
        events: {
          'stopVideo': stopYotubVideo,
            'onStateChange': onPlayerStateChange
        }
    });
    players[2] = new YT.Player('player2', {
        events: {
          'stopVideo': stopYotubVideo,
            'onStateChange': onPlayerStateChange
        }
    });
    players[3] = new YT.Player('player3', {
      events: {
        'stopVideo': stopYotubVideo,
          'onStateChange': onPlayerStateChange
      }
  });
  players[4] = new YT.Player('player4', {
    events: {
      'stopVideo': stopYotubVideo,
        'onStateChange': onPlayerStateChange
    }
});
  players[5] = new YT.Player('player4', {
    events: {
      'stopVideo': stopYotubVideo,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
    let link = event.target.id;
    let newstate = event.data;
    if (newstate === YT.PlayerState.PLAYING) {
        players.forEach(function(item, i) {
            if (item.id != link) {
              item.pauseVideo && item.pauseVideo()
            }
        });
      }
}

 function stopYotubVideo(){
  players.forEach(function(item, i) {
   item.stopVideo();
  });
}


dots.forEach(dot=>{
  dot.addEventListener('click', stopYotubVideo);
})
  
next.addEventListener('click', stopYotubVideo);
prev.addEventListener('click', stopYotubVideo);

// items.forEach((item)=>{
//   item.addEventListener('click', function createIframe(e){
//     let iframe = document.createElement('iframe')
//     item.classList.add('item-iframe')
//     iframe.width = 452
//     iframe.height = 254
//     iframe.title = "YouTube video player" 
//     iframe.frameborder = 0
//     iframe.autoplay = 1
//     iframe.allowfullscreen
//     iframe.id = "player1"
    
  
//     if(e.currentTarget.classList.contains('item1')){
//       iframe.src = youtube[1].src
//     }
//     if(e.currentTarget.classList.contains('item2')) {
//       iframe.src = youtube[2].src
//     }
//     if(e.currentTarget.classList.contains('item3')){
//       iframe.src = youtube[3].src
//     }
//     if(e.currentTarget.classList.contains('item4')){
//       iframe.src = youtube[4].src
//     }
//     if(e.currentTarget.classList.contains('item5')){
//       iframe.src = youtube[0].src
//     }
//     item.innerHTML = ""
//     item.append(iframe)

//     setTimeout(()=>{
//       function onYouTubePlayerAPIReady() {
//         player = new YT.Player('player1', {
//           events: {'onReady': ()=>{
//             player.playVideo()
//           }}
//         });
//       }
//       onYouTubePlayerAPIReady()
//     }, 3000)
    

//   })
//   if(item.classList.contains('item-iframe')){
//     return !createIframe()
//   }
// })

// const youtube = [
//   {slideIndex: 0,
//     src: "https://www.youtube.com/embed/zp1BXPX8jcU"  
//   },
//   {slideIndex: 1,
//     src: "https://www.youtube.com/embed/Vi5D6FKhRmo?&autoplay=1"   
//   },
//   {
//     slideIndex: 2,
//     src: "https://www.youtube.com/embed/NOhDysLnTvY?&autoplay=1"  
//   },
//   {slideIndex: 3,
//   src: "https://www.youtube.com/embed/aWmJ5DgyWPI?&autoplay=1" 
//   },
//   {slideIndex: 4,
//     src: "https://www.youtube.com/embed/2OR0OCr6uRE?&autoplay=1" 
//   }
// ];

// function infinitSlids (){
//   let firstSlide = items[0];
//   let lastSlide = items[ items.length - 1 ];
//   let firstSlideClone = firstSlide.cloneNode( true );
//   let lastSlideClone = lastSlide.cloneNode( true );
//   items.appendChild( firstSlideClone );
//   items.insertBefore( lastSlideClone, firstSlide );
// }
