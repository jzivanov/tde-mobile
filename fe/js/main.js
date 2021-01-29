$("#searchButton").click(function () {
    alert("Handler for .click() called.");
});
$(document).ready(function () {
  $('.table_items').click(function () {
    console.log(this);
    const $row = $(this).closest("tr"),
      $tds = $row.find("td");

    $.each($tds, function () {
        const data_field = $(this).attr("data-field");
        if (typeof data_field !== typeof undefined && data_field !== false) {
            if (data_field === 'id') {
              $('#id').val($(this).html());
            }
            if (data_field === 'firstName') {
                $('#ime').val($(this).html())
            }
            if (data_field === 'lastName') {
                $('#prezime').val($(this).html())
            }
            if (data_field === 'phoneNumber') {
                $('#brtel').val($(this).html())
            }
            if (data_field === 'brand') {
                $('#tel').val($(this).html())
            }
            if (data_field === 'model') {
                $('#modeltel').val($(this).html())
            }
            if (data_field === 'imei') {
                $('#IMEI').val($(this).html())
            }
            if (data_field === 'price') {
                $('#cena').val($(this).html())
            }
            if (data_field === 'service') {
                $('#service').val($(this).html())
            }
        }
    });
  });
  $("#saveButton").click(function () {
    $.ajax({
      url: 'http://localhost:3000/',
      type: 'post',
      data: JSON.stringify({
        firstName: $("#ime").val(),
        lastName: $("#prezime").val(),
        phoneNumber: $("#brtel").val(),
        phone: $("#tel").val(),
        phoneModel: $("#modeltel").val(),
        IMEI: $("#IMEI").val(),
        price: $("#cena").val(),
        service: $("#service").val()
      }),
      headers: {
        "Content-Type": 'application/json'
      },
    }).done(data => {
      console.log('success');
      console.log(data);
      console.log(JSON.stringify($('#myTable').bootstrapTable('getRowByUniqueId', $('#id').val())));
    }).fail(error => {
      console.log('error');
      console.log(error)
    });
  });
});
$('#myTable').on('click', buttonSelector='deleteButton', function () {
    $(this).closest('tr').remove();
});
