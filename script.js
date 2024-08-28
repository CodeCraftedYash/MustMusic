const audio=document.querySelector("audio");
const playPauseButton=document.querySelector("#play-pause");
const progress=document.querySelector("#progress");
const array=["love is a waste of time (slowed  reverb)  pk.mp3","Lyrical_ Ik Junoon (Paint It Red)  Zindagi Na Milegi Dobara  Hrithik, Katrina, Farhan Akhtar.mp3","tum se hi.mp3","Sajdaa.mp3","Y2meta.app - Shiva Shiva Shiva (Raga Adana) (320 kbps).mp3"];
const loopButton=document.querySelector("#loop-btn");
let isLooped=0;
const prevButton=document.querySelector("#prev");
const nextButton=document.querySelector("#next");
let count=0;
const volumeControl=document.querySelector("#volumeControl");
const musicDisplay=document.querySelector("#musicList");
const listContainer=document.querySelector("#listContainer");
const listButton=document.querySelector("#list");
const loadingScreen=document.querySelector("#loadingScreen");
const page1=document.querySelector("#page1");
function loadingAnimation(){
    loadingScreen.style.opacity="0";
}
function playMusic(){
    audio.play();
    console.log("playMusic function was called");
}
function pauseMusic(){
    audio.pause();
    console.log("pauseMusic function was called");
}
function playPause(){
    playPauseButton.addEventListener("click",()=>{
        if(audio.paused){
            playMusic();
            playPauseButton.textContent="Pause";
        }
        else{
            pauseMusic();
            playPauseButton.textContent = "Play";
        }
        
    })
    audio.addEventListener("timeupdate",()=>{
        const prog=(audio.currentTime / audio.duration) * 100;
        progress.value=prog;
    });
    progress.addEventListener("input",(e)=>{
        const seekTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    })
    console.log(audio);
}
function loop(){
    loopButton.addEventListener("click",()=>{
        if(!isLooped){
            isLooped=1;
            loopButton.style.backgroundColor="rgb(175, 230, 149)"; 
            console.log("Music is on loop");
        }
        else{
            isLooped=0;
            loopButton.style.backgroundColor="rgb(255, 255, 255)";
            console.log("Music is not on looped");
             
        }
    })
}
function prev(){
        if (count === 0) {
            count = array.length - 1;
        } else {
            count--;
        }

        audio.src = `./musics/${array[count]}`; 
        audio.load();
        playMusic();
        playPauseButton.textContent="Pause";
}
function next(){
        if (count === array.length - 1) {
        count = 0;
        } else {
        count++;
          }

        audio.src = `./musics/${array[count]}`; 
        audio.load();
        playPauseButton.textContent="Pause";
        playMusic();
}
function prevAndNext() {
   
    prevButton.addEventListener("click", () => {
        prev();
    });

    nextButton.addEventListener("click", () => {
        next();
    });
}
function vol(){
    volumeControl.addEventListener("input",function(){
        audio.volume=this.value;
    })
}
function timeline(){
 audio.addEventListener("timeupdate",()=>{
    if(audio.currentTime==audio.duration){
        if(isLooped){
            playMusic();
        }
        else{

        }
 }
 })

};

function musicList(){
    listButton.addEventListener("click",()=>{
        if(musicDisplay.style.opacity==0){
        musicDisplay.style.opacity="1";
        musicDisplay.style.pointerEvents="all";
        }
        else{
            musicDisplay.style.opacity="0";
            musicDisplay.style.pointerEvents="none";
        }
        //musiclist=musicdisplay
        musicDisplay.addEventListener("mouseleave",()=>{
            
                musicDisplay.style.opacity="0";
                musicDisplay.style.pointerEvents="none";
            
        })
    })
}
function createListItems(){
    array.forEach((elem) => {
        const listItems=document.createElement("li");
        
        const h4 = document.createElement("h4");
        h4.textContent=elem;

        listItems.appendChild(h4);

        listContainer.appendChild(listItems);
    });
}

window.addEventListener("load", () => {
    loadingAnimation(); 
    setTimeout(() => {
        loadingScreen.style.display = "none"; 
    }, 
    500);
});

createListItems()
loop();
playPause();
prevAndNext();
vol();
timeline();
musicList();
