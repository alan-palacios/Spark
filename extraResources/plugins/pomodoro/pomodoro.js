const path = require('path');
const { remote } = require('electron');
const spark = require(path.join(__dirname + '../../../../src/spark.js') );
const addItem = spark.addItem;
const screen = spark.screen;
const toggleWindow = spark.toggleWindow;

console.log(spark);
let customTime = 25;
let win = null;
const stopTimer = ()=>{
    console.log("stop");
}
const showTimer = (time) =>{
    if (win===null) {        
        win = new remote.BrowserWindow({
            width: 120,
            height: 40,        
            frame: false,    
            transparent: true,
            fullscreenable: false,
            resizable: false,
            minimizable: false,
            maximizable: false,
            skipTaskbar: true,
            webPreferences: {
                nodeIntegration: true,
            },
            parent: remote.getCurrentWindow()            
          })                  
        
        win.loadFile(path.join(__dirname+'./pomodoro.html'));            
        win.setAlwaysOnTop(true, "floating", 1);
        win.center();    
        win.setPosition(screen.getPrimaryDisplay().size.width/2-60,0);                    
        win.on('close', ()=>win=null);
        // win.webContents.toggleDevTools();
        win.webContents.on('did-finish-load', () => {
            win.webContents.send('time', time);
            toggleWindow();
        });
        
    }    
}

let defaultItem = {
    icon_path: "pomodoro/pomodoro_icon.png",
    title: "Start timer",
    description: "Default 25 minutes timer",
    priority: 0,
    action: ()=>showTimer(25)
};
let customItem = {
    icon_path: "pomodoro/pomodoro_icon.png",
    title: "Start timer",
    description: `${customTime} minutes custom timer`,
    priority: 0,
    action: ()=>showTimer(customTime)    
};

const displayItem = (inputValue)=>{                   
    const searchKeyword = inputValue.toLowerCase();    
    let args = searchKeyword.split(' ');    
    if ("pomodoro".includes(args[0])) {        
        if (args.length===1) {            
            addItem(defaultItem);            
        }else if (args.length===2){            
            let time = Number(parseInt(args[1], 10));            
            if (time !== NaN && time>0 ) {
                customTime=time;
                customItem.description = `${customTime} minutes custom timer`;                
                addItem(customItem);                
            }
        }
    }           
}

sparkEvent.on("inputEvent", (inputValue)=> displayItem(inputValue));

