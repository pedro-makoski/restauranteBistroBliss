const configs_video = "&autoplay=1&mute=0&controls=1&loop=1&rel=1";

function appearVideo(container_to_disapear, video, iframe) {
    container_to_disapear.style.display = 'none';
    video.style.display = 'flex';
    iframe.src = iframe.src+configs_video;
}

function dissapearVideo(container_to_disapear, video, iframe) {
    container_to_disapear.style.display = 'flex';
    video.style.display = 'none';
    iframe.src = iframe_video.src.slice(0, configs_video.length);
}

const video = document.querySelector('#video-demonstration .iframe_video');
const before_video = document.querySelector('#video-demonstration .appear_main');
const button_play = document.getElementById("play-video-astley");
const exit_button = document.querySelector("#video-demonstration .exit_button");
const iframe_video = video.querySelector('iframe');


button_play.addEventListener('click', () => {
    appearVideo(before_video, video, iframe_video);
}) 

exit_button.addEventListener('click', () => {
    dissapearVideo(before_video, video, iframe_video)
})