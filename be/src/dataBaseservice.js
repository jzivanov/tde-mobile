const { v4: uuidv4 } = require('uuid');
const items = [];
function getById(id) {
    console.log(items);
    for (const item of items) {
        if (item.id === id) {
            return item;
        }
    }
}
function getAll() {
    return items;
}
function save(newItem){
    newItem.id=uuidv4();
    items.push(newItem);
}
module.exports = {dbGetById:getById, save, getAll }
