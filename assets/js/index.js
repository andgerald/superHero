$(document).ready(function () {
  $("#heroButton").click(function () {
    //guardamos el número que ingresa el usuario para luego agregarloa a la url
    const heroNumber = $("#heroNumber").val();
    $.ajax({
      type: "GET",
      url:
        "https://www.superheroapi.com/api.php/4905856019427443/" + heroNumber,
      dataType: "json",
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.log("error:", error.status);
        alert("ha ocurrido un error con la pagina: error " + error.status);
      },
    });
  });
});
