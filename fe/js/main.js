$("#searchButton").click(function () {
    alert("Handler for .click() called.");
});
$(document).ready(function () {
  $('.table_items').click(function () {
    console.log(this);
    const $row = $(this).closest("tr"),       
      $tds = $row.find("td");             

    $.each($tds, function () {
        const item_type = $(this).attr("item_type");
        if (typeof item_type !== typeof undefined && item_type !== false) {
            if (item_type === 'firstName') {
                $('#ime').val($(this).html())
            }
            if (item_type === 'lastName') {
                $('#prezime').val($(this).html())
            }
            if (item_type === 'phoneNumber') {
                $('#brtel').val($(this).html())
            }
            if (item_type === 'phone') {
                $('#tel').val($(this).html())
            }
            if (item_type === 'phoneModel') {
                $('#modeltel').val($(this).html())
            }
            if (item_type === 'IMEI') {
                $('#IMEI').val($(this).html())
            }
            if (item_type === 'price') {
                $('#cena').val($(this).html())
            }
            if (item_type === 'usluga') {
                $('#uslugaKvar').val($(this).html())
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
        usluga: $("#uslugaKvar").val()
      }),
      headers: {
        "Content-Type": 'application/json'
      },
      dataType: 'json',
      success: function (data) {
        console.info(data);
      }
    });
  });
});
$("#saveButton").click(function () {
    var tbody = $('#myTable').children('tbody');
    var table = tbody.length ? tbody : $('#myTable');
    var row = '<tr>'+
        '<td>{{Ime}}</td>'+
        '<td>{{Prezime}}</td>'+
        '<td>{{Broj telefon}}</td>'+
        '<td>{{Telefon}}</td>'+
        '<td>{{Model}}</td>'+
        '<td>{{IMEI}}</td>'+
        '<td>{{Cena}}</td>'+
        '<td>{{Usluga/kvar}}</td>'+



    table.append(row.compose({
        'Ime': $("#ime"),
        'Prezime': $("#prezime"),
        'Broj telefona': $("#brtel"),
        'Telefon': $("#tel"),
        'Model':$("#modelTel"),
        'IMEI':$("#IMEI"),
        'Cena':$("#cena"),
        'Usluga/kvar':$("#usluga/kvar"),
    }));
});
$('#myTable').on('click', buttonSelector='deleteButton', function () {
    $(this).closest('tr').remove();
});
