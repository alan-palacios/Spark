const { screen} = require('electron').remote
window.$ = window.jQuery = require('jquery');
const searchInput = $( "#search-input" );
const pluginManager = require('./plugin-manager.js');
const eventManager = require('./event-manager.js');
const itemListManager = require('./item-list-manager.js');

module.exports = {
    addItem : itemListManager.addItem,
    clearItemData : itemListManager.clearItemData,  
    searchInput: searchInput,    
    screen: screen,
    toggleWindow: eventManager.toggleWindow
}



