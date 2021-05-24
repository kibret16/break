if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    navigator.serviceWorker
      .register("pwabuilder-sw.js", {
        scope: "./"
      })
      .then(function(reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}

link = document.getElementById("install-link");
link.style.display = "none";
if (!window.matchMedia('(display-mode: standalone)').matches) {
  link.style.display = "block";
}

var container = document.getElementById('container');
var startButton = document.getElementById('start-button');
var breatheCounter = document.getElementById('breathe-counter');
var text = document.getElementById('text');
var counter = document.getElementById("counter");

breatheCounter.style.display = "none";

const sec = 1000;
const min = 60 * sec;

var date = new Date();
date = date.getDate();

var readyTime = 0*sec;
var breatheInTime = 4*sec;
var holdTime = 7*sec;
var breatheOutTime = 8*sec;
var breatheTime = breatheInTime + holdTime + breatheOutTime;
var rounds = Math.floor(Math.random() * 10) + 5; //date; //from 5 to 15
var totalTime = rounds * breatheTime;

const zeroPad = (num, places) => String(num).padStart(places, '0')
var time = rounds * (breatheTime/sec);
text.innerHTML = "Ready";


function say(msg) {
  var msg = new SpeechSynthesisUtterance(msg);
  var voicesList = speechSynthesis.getVoices();
  msg.voice = voicesList.find((voice) => voice.lang === 'en-US');
  speechSynthesis.speak(msg);
}

function breathe() {
  setTimeout(function(){ 
    text.innerHTML = "Breathe In";
    //say("Breathe In");
  }, readyTime);

  setTimeout(function(){ 
    text.innerHTML = "Hold";
    //say("Hold");
  }, breatheInTime + readyTime);

  setTimeout(function(){ 
    text.innerHTML = "Breathe Out";
    //say("Breathe Out");
  }, holdTime + breatheInTime + readyTime);
}

function breathExercise() {
  startButton.style.display = "none"; 
  breatheCounter.style.display = "block";

  breathe();
  // var audio = new Audio('audio/2min.mp3');
  // audio.play();
  counter.innerHTML = ("Round: " + zeroPad(rounds, 2));
  rounds--;
  var breatheRounds = setInterval(function (){
    breathe();
    if(rounds == 0) {
      // text.innerHTML = "Done.";
      // say("You're done.");
      startButton.style.display = "block"; 
      breatheCounter.style.display = "none";
      rounds = date+1;
      clearInterval(breatheRounds);
    }
    counter.innerHTML = ("Round: " + zeroPad(rounds, 2));
    rounds--
  }, breatheTime);
}

function showdiv(id){
  document.getElementById(id).style.display = "block";
}