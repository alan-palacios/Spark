//https://gist.github.com/frostney/4165353
const fs = require('fs');
const path = require('path');


const spark = require(path.join(__dirname + '../../../../src/spark.js') );
const addItem = spark.addItem;
let inputValue;
let fileArray = [];
let fileCounter = 0;

let fileItem = {
  icon_path: "files/files_icon.png",
  title: "File",
  description: "Default 25 minutes timer",
  priority: 0,
  action: ()=>openFile(25)
};

const openFile = (time) =>{
    console.log("file finder "+time);
}


const fileCallback = (filePath)=>{          
    // addItem(fileItem);             
    // const fileContents = fs.readFileSync(filePath, 'utf8');
    // console.log(filePath, fileContents);
    if (fileArray.length>10) return;          
    if (filePath.includes(inputValue)) {
      fileArray.push(filePath);
    }    
    console.log(fileArray);
}

const walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err); 
    let pending = list.length;
    if (!pending) return done(null, results)  
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};
 


sparkEvent.on("inputEvent", (inputValue)=> {
  // test it out on home directory
  walk("C:/ProgramData/Microsoft/Windows/Start Menu/Programs", (err, results) => {
    if (err) throw err;
    console.log(results);
  });
});


