$("#searchButton").click(function () {
    alert("Handler for .click() called.");
});

// cb represents a callback, have a look at https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
function sendSaveRequest(cb) {
  console.log('sending save request');

  $.ajax({
    url: 'http://localhost:3000/',
    type: 'post',
    data: JSON.stringify({
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      phoneNumber: $("#phoneNumber").val(),
      brand: $("#brand").val(),
      model: $("#model").val(),
      imei: $("#imei").val(),
      price: $("#price").val(),
      service: $("#service").val()
    }),
    headers: {
      "Content-Type": 'application/json'
    },
  }).done(data => {
    cb(data, undefined);
  }).fail(error => {
    cb(undefined, error);
  });
}

function sendUpdateRequest() {

}
function sendDeleteRequest(id) {
  // TODO implement sending delete request as well as deleting on be side
  console.log('sending delete request');
}
function getAll(cb) {
  // TODO get all items from be
}
function update(dataTable, id) {
  console.log("update")

  $.ajax({
    url: `http://localhost:3000/` + id,
    type: 'put',
    data: JSON.stringify({
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      phoneNumber: $("#phoneNumber").val(),
      brand: $("#brand").val(),
      model: $("#model").val(),
      imei: $("#imei").val(),
      price: $("#price").val(),
      service: $("#service").val()
    }),
    headers: {
      "Content-Type": 'application/json'
    },
  }).done(data => {
    // TODO update item in table

  }).fail(error => {

  });
}
function save(dataTable) {
  // Sending a function as a parameter
  sendSaveRequest((data, error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      dataTable.row.add(
        {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          brand: data.brand,
          model: data.model,
          imei: data.imei,
          price: data.price,
          service: data.service
        }).draw();
    }
  });
}

function deleteItem(dataTable, id) {
  console.log(`delete item with id: ${id}`);
  sendDeleteRequest(id);
  const row = dataTable.row(`#${id}`).node();
  row.remove();
}

$(document).ready(function () {
  // Create new DataTable on #itemTable
  const dataTable = $('#itemTable').DataTable({
    paging: false,
    searching: false,
    ordering: false,
    rowId: 'id',
    columns: [
      { data: 'firstName' },
      { data: 'lastName' },
      { data: 'phoneNumber' },
      { data: 'brand' },
      { data: 'model' },
      { data: 'imei' },
      { data: 'price' },
      { data: 'service' }
    ]
  });
  let selectedRowId = undefined;

  $('#itemTable tbody').on( 'click', 'tr', function () {
    const row = dataTable.row( this ).data();
    selectedRowId = row.id;
    console.log(selectedRowId)
    if (selectedRowId !== undefined) {
      $('#firstName').val(row.firstName);
      $('#lastName').val(row.lastName);
      $('#phoneNumber').val(row.phoneNumber);
      $('#brand').val(row.brand);
      $('#model').val(row.model);
      $('#imei').val(row.imei);
      $('#price').val(row.price);
      $('#service').val(row.service);

      $("#deleteButton").removeClass("invisible").addClass("visible");
      $('#exampleModal').modal('show');
    }
  });
  $("#saveButton").click(function () {
    save(dataTable);
  });
  $("#updateButton").click(() => {
    update(dataTable, selectedRowId)
  });
  $("#deleteButton").click(() => {
    deleteItem(dataTable, selectedRowId);
  });
  $('#closeButton').click(() => {
    console.log('close');
    $("#deleteButton").removeClass("visible").addClass("invisible");
    // Delete input values
  });
});
