const path = require('path');
const spark = require(path.join(__dirname + '../../../../src/spark.js') );
const addItem = spark.addItem;

let item = {
    icon_path: "math/math_icon.png",
    title: "",
    description: "Result",
    priority: 0,
    action: ()=>{}
};

const calculate = (inputValue)=>{        
    let result = 0;
    try {
        result = eval(inputValue);        
        item.title=result;
        addItem(item);                
    } catch (e) {
        // console.log(e);
    }
}

sparkEvent.on("inputEvent", (inputValue)=> calculate(inputValue));

