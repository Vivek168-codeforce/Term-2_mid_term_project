window.addEventListener("load", function(){
  this.document.querySelector(".listen").classList.add("animate")
})
const unmuted="fa-volume-high";
const muted="fa-volume-xmark";

const soundCont=document.querySelector('.soundTracker');

const volIcon=soundCont.children[0];
let volBar=document.querySelector('#volumeSlider')

let currentVol=volBar.value;

volIcon.addEventListener('click', function(e){
  
    if(volIcon.classList.contains(unmuted)){
      volIcon.classList.remove(unmuted)
      volIcon.classList.add(muted)
      currentVol=volBar.value;
      volBar.value=0
      updateAllVolumes(0);
    }else{
      volIcon.classList.remove(muted)
      volIcon.classList.add(unmuted)
      volBar.value=currentVol
      updateAllVolumes(currentVol/100)
    }
})

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const sounds = {};

document.querySelectorAll('img[data-sound]').forEach(img => {
    let soundFile = img.dataset.sound;

    // audio element
    let audioEl = new Audio(soundFile);

    // Web Audio: nodes
    let track = audioContext.createMediaElementSource(audioEl);
    let gainNode = audioContext.createGain();

    // connect
    track.connect(gainNode).connect(audioContext.destination);

    // save reference
    sounds[soundFile] = { audioEl, gainNode };

    // play sound
    img.addEventListener('click', () => {
        audioContext.resume();
        audioEl.currentTime = 0;
        audioEl.play();
    });
});

// ----------------------
// Volume Slider
// ----------------------
volBar.addEventListener("input", function () {
    let vol = volBar.value / 100;
    updateAllVolumes(vol);
});

function updateAllVolumes(vol) {
    Object.values(sounds).forEach(obj => {
        obj.gainNode.gain.value = vol;
    });
}