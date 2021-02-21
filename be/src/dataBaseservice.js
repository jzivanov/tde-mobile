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
function update(updateItem, id) {
  console.log('update item with id' + id + " and body: " + JSON.stringify(updateItem));

  const item = getById(id);
  item['firstName'] = updateItem.firstName;
  item['lastName'] = updateItem.lastName;
  item['phoneNumber'] = updateItem.phoneNumber;
  item['brand'] = updateItem.brand;
  item['model'] = updateItem.model;
  item['imei'] = updateItem.imei;
  item['price'] = updateItem.price;
  item['service'] = updateItem.service;
}
module.exports = {dbGetById:getById, save, getAll, update }
