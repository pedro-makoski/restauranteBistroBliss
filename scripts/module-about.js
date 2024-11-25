const configs_video = "&autoplay=1&mute=0&controls=1&loop=1&rel=1";
let isprimeiro = []

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

async function atualizarElemento(valorinicial, valorfinal, elemento, time) {
    let valoratual = valorinicial;

    requestAnimationFrame(atualizarValor);

    async function atualizarValor() {
        if(valoratual < valorfinal) {
            valoratual++;
            elemento.innerHTML = valoratual;
        }

        setTimeout(() => {requestAnimationFrame(atualizarValor)}, time)
    }
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

const HEIGHT_APPEAR_ALL = 3500;

function scrollIncrement(elemento, father, i, time, taxaDeAparicaoDoFather) {
    const diferencade100PorcentoMenosTaxaDeAparicaoDoFather = 1-taxaDeAparicaoDoFather;
    let elemento_pai_bounding = elements_to_change[i].closest(father).getBoundingClientRect()

    let final_value = parseInt(elements_to_change[i].getAttribute("data-final"));
    const start = elements_to_change[i].innerHTML;
    console.log(diferencade100PorcentoMenosTaxaDeAparicaoDoFather)
    
    if((!isprimeiro[i] && elemento_pai_bounding.top <= window.innerHeight*diferencade100PorcentoMenosTaxaDeAparicaoDoFather && elemento_pai_bounding.bottom >= 0) || window.innerWidth >= HEIGHT_APPEAR_ALL) {
        isprimeiro[i] = true;
        atualizarElemento(start, final_value, elemento, time);
    }
}


const ELEMENT_FATHER_SCROLL = ".container-data-count";
const TIME_DELAY = 10; 
const elements_to_change = Array.from(document.querySelectorAll('.change-number'));
const WINDOW_SIZE = document.querySelector('body').getBoundingClientRect().height;
const TAXA_DE_APARICAO_DO_FATHER = 0.15;

for(let i = 0; i < elements_to_change.length; i++){
    if(typeof isprimeiro[i] === "undefined") {
        isprimeiro[i] = false;
    }


    scrollIncrement(elements_to_change[i], ELEMENT_FATHER_SCROLL, i, TIME_DELAY, TAXA_DE_APARICAO_DO_FATHER)
 
    window.addEventListener('scroll', () => {
      scrollIncrement(elements_to_change[i], ELEMENT_FATHER_SCROLL, i, TIME_DELAY, TAXA_DE_APARICAO_DO_FATHER);
    })

    window.addEventListener('resize', () => {
        scrollIncrement(elements_to_change[i], ELEMENT_FATHER_SCROLL, i, TIME_DELAY, TAXA_DE_APARICAO_DO_FATHER);
    })
}