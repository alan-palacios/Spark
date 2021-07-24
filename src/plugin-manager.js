const fs = require('fs');
const path = require('path');

// read files
function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
      if (err) {
          return cb && cb(err)
      }
      try {
          const object = JSON.parse(fileData)
          return cb && cb(null, object)
      } catch(err) {
          return cb && cb(err)
      }
  })
}

//read and import all plugins
jsonReader( path.join(__dirname + '/../extraResources/conf/plugins.json'), (err, data) => {
  if (err) {
      console.log(err)
      return
  }
  data.plugins.forEach(element => {    
    require( path.join(__dirname + `/../extraResources/${element.path}`) );
    console.log(`${element.name} plugin loaded`);
  });  
})
