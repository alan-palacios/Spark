const path = require('path');
const items = $( "#items" );
let items_data=[];
let itemListIndex = 0;

const executeItemAction = (i)=> items_data[i].action();

const clearItemData =()=>{  
  items.empty();//clear html  
  items_data=[];//clear list
  itemListIndex = 0;//set first element as the selected  
}

const addItem = (item) => {    
  items.empty();//clear html    
  items_data.push(item);//add item to list    
  renderItemList();//re-render the list with the new items  
}
  
const renderItemList = () => {  
  items.append('<hr>');
  items_data.forEach((element, i) => {    
    let addedItem = $(`
      <div class="item" id="item_${i}">
        <div class="image-container">
          <img src="${ path.join(__dirname+'/../extraResources/plugins/'+element.icon_path)}" alt="icon" class="item-icon">
        </div>
        <div class="description">
          <div class="item-title">${element.title}</div>            
          <small class="item-path">${element.description}</small>  
        </div>
      </div>
    `).appendTo(items);
    addedItem.on('click', ()=>executeItemAction(i));    
    addedItem.on('mouseenter', ()=>updateSelectedItem(i));    
    if (i===0) addedItem.addClass('item-hover');//set the first elemment as selected    
  });      
}

const updateSelectedItem = (i)=>{   
  if (i===itemListIndex)return;
  $(`#item_${itemListIndex}`).removeClass('item-hover');
  itemListIndex = i;
  $(`#item_${itemListIndex}`).addClass('item-hover');
}

const getItemListIndex= ()=> itemListIndex;
const getItems_data = ()=> items_data;
module.exports={
  addItem : addItem,
  clearItemData : clearItemData,
  updateSelectedItem : updateSelectedItem,
  getItemListIndex : getItemListIndex,
  executeItemAction : executeItemAction,
  getItems_data : getItems_data  
}

