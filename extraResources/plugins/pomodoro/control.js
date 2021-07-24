window.$ = window.jQuery = require('jquery');
const ipc = require('electron').ipcRenderer;
barBg = $('.bar-background');
var audio = new Audio('./notification_up.mp3');

let minutes = 25;
let workTime;        
let breakTime = 5*60;        
let inter;
let pause = false;

ipc.on('time', (event, time) => {
    minutes=time;
    workTime = minutes*60;        
    document.getElementById('playpauseContainer').onclick = pauseTimer;
    document.getElementById('stopContainer').onclick = stopTimer;
    startTimer(workTime, true);   
})

startTimer = (seconds, work)=>{            
    timeStr = new Date(seconds * 1000).toISOString().substr(11, 8);                
    document.getElementById("time").innerHTML=timeStr;   
    inter =setInterval(()=>{          
        if (!pause) {
            seconds--;
            timeStr = new Date(seconds * 1000).toISOString().substr(11, 8);                
            document.getElementById("time").innerHTML=timeStr;                
            if (seconds==0) {
                clearInterval(inter);
                audio.play();
                if (work) {
                    barBg.css('background-color', 'var(--green-bar)');
                    startTimer(breakTime, false);    
                }else{
                    barBg.css('background-color', 'var(--red-bar)');
                    startTimer(workTime, true); 
                }                    
            }  
        }                                    
    },1000);
    
}      

pauseTimer = ()=>{      
    
    pause= !pause;
    if (pause) {
        document.getElementById('playpauseBtn').setAttribute('src','./play.png');                
    }else{
        document.getElementById('playpauseBtn').setAttribute('src','./pause.png');
    }
}

stopTimer = ()=>{
    clearInterval(inter);
    this.close();
}

   

