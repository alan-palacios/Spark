const { ipcRenderer } = require('electron');
let EventEmitter = require('events').EventEmitter;
const itemListManager = require('./item-list-manager.js');

const clearItemData = itemListManager.clearItemData;
const updateSelectedItem = itemListManager.updateSelectedItem;
const executeItemAction = itemListManager.executeItemAction;
const getItemListIndex = itemListManager.getItemListIndex;
const getItems_data = itemListManager.getItems_data;


const searchInput = $( "#search-input" );
window.sparkEvent = new EventEmitter();
searchInput.focus();
let keydown = false;

const onSearchInput = ()=>{  
  clearItemData();
  if (searchInput.val()!=="") {//if the field is empty the event dont gets triggered    
    sparkEvent.emit("inputEvent", searchInput.val());  //input event    
  }  
}
searchInput.on('input', onSearchInput);

$(document).on('keydown', e =>{        
  // execute item action on enter key down     
  if(e.which == 13 && searchInput.val()!=='') {// enter key              
      executeItemAction(getItemListIndex());                  
  }    
  // move through item list
  if(e.which === 38 || e.which===40)e.preventDefault();  
  if(e.which == 38 && getItemListIndex()!=0) { //up arrow key         
      let nextIndex = getItemListIndex()-1;
      if(nextIndex<0)nextIndex=0;                    
      updateSelectedItem(nextIndex);
  }
  if(e.which == 40 && getItemListIndex()!=getItems_data().length-1) { //down arrow key        
      let nextIndex = getItemListIndex()+1;
      if(nextIndex>getItems_data().length-1)nextIndex=getItems_data().length-1;                 
      updateSelectedItem(nextIndex);
  }
});

const toggleWindow = () => {    
  searchInput.val('');
  clearItemData();
  setTimeout(ipcRenderer.send('toggleWindow'),1);
}



module.exports = {
  toggleWindow : toggleWindow  
}
