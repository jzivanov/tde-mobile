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
      service: $("#service").val(),
      note: $("#note").val(),
      date: $("#date").val()
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
      service: $("#service").val(),
      note: $("#note").val(),
      date: $("#date").val()
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
          service: data.service,
          note: data.note,
          date: data.date
        }).draw();
      alert("Your data has been successfully saved");
    }
  });
}

function deleteItem(dataTable, id) {
  console.log(`delete item with id: ${id}`);
  sendDeleteRequest(id);
  const row = dataTable.row(`#${id}`).node();
  row.remove();
}

function resetFields(){
  console.log();
  $('#firstName').val('');
  $('#lastName').val('');
  $('#phoneNumber').val('');
  $('#brand').val('');
  $('#model').val('');
  $('#imei').val('');
  $('#price').val('');
  $('#service').val('');
  $('#note').val('');
  $("#updateButton").removeClass("visible").addClass("invisible");
  $("#deleteButton").removeClass("visible").addClass("invisible");
}

function setDate(){
  $('#date').datepicker();
  $('#date').datepicker('setDate',new Date());
}

function populateTable(dataTable) {
  $.ajax({
    url: 'http://localhost:3000/',
    type: 'get',
    headers: {
      "Content-Type": 'application/json'
    },
  }).done(allData => {
    console.log(allData);
    allData.forEach(data => {
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
          service: data.service,
          note: data.note,
          date: data.date
        }).draw();
    });
  }).fail(error => {
    console.log('error while fetching data', error);
  });
}

$(document).ready(function () {
  setDate();
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
      { data: 'service' },
      { data: 'note' },
      { data: 'date'}
    ]
  });
  let selectedRowId = undefined;
  let selectedRow = undefined;
  populateTable(dataTable);
  $('#itemTable tbody').on( 'click', 'tr', function () {
    const row = dataTable.row( this ).data();
    selectedRow = dataTable.row(this);
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
      $('#note').val(row.note);
      $('#date').val(row.date);
      $("#updateButton").removeClass("invisible").addClass("visible");
      $("#deleteButton").removeClass("invisible").addClass("visible");
      $('#exampleModal').modal('show');
      $('#saveButton').hide();
    }
  });
  $("#saveButton").click(function () {
    $('#exampleModal').modal('hide');
    save(dataTable);
    resetFields();



  });
  $("#device").click(function (){
    $('#exampleModal').modal('show');

  });
  $("#updateButton").click(() => {
    update(dataTable, selectedRowId);
    selectedRow.data({
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      phoneNumber: $("#phoneNumber").val(),
      brand: $("#brand").val(),
      model: $("#model").val(),
      imei: $("#imei").val(),
      price: $("#price").val(),
      service: $("#service").val(),
      note: $("#note").val(),
      date: $("#date").val()
    }).draw();
    alert("Your data has been successfully updated");
    resetFields();
    $('#saveButton').show();
    $('#exampleModal').modal('hide');
  });
  $("#deleteButton").click(() => {
    deleteItem(dataTable, selectedRowId);
    resetFields();
    $('#saveButton').show();
    $('#exampleModal').modal('hide');

  });
  $('#closeButton').click(() => {
    console.log('close');
    $('#saveButton').show();
    $("#deleteButton").removeClass("visible").addClass("invisible");
    // Delete input values
    $("#updateButton").removeClass("invisible").addClass("visible");
    resetFields();
  });
});


