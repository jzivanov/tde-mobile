$("#searchButton").click(function () {
    alert("Handler for .click() called.");
});
$(document).ready(function () {
  $('.table_items').click(function () {
    console.log(this);
    const $row = $(this).closest("tr"),       // Finds the closest row <tr>
      $tds = $row.find("td");             // Finds all children <td> elements

    $.each($tds, function() {
      if ($(this).attr("item_type").text() === "firstName") {
        const firstName = $(this).text();
        $('#ime').val(firstName)
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
