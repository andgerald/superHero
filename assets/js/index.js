$(document).ready(function () {
  $(".ocultar").hide();
  $("#return").hide();
  $("#return").click(function () {
    $(".ocultar").hide();
    $(".prueba").show();
    $("#heroNumber").val("");
    $("#return").hide();
    $("#chartContainer").hide();
  });
  $("#heroButton").click(function (e) {
    $(".ocultar").show();
    $(".prueba").hide();
    $("#return").show();
    $("#chartContainer").show();

    //guardamos el número que ingresa el usuario para luego agregarloa a la url
    const heroNumber = $("#heroNumber").val();
    const regex = /^[0-9]*$/;
    if (regex.test(heroNumber) === false || heroNumber === "") {
      e.preventDefault();
      alert("debes ingresar un número");
      return;
    }
    $.ajax({
      type: "GET",
      url:
        "https://www.superheroapi.com/api.php/4905856019427443/" + heroNumber,
      dataType: "json",
      success: function (data) {
        console.log(data);
        let dataPoints = [];
        let options = {
          title: {
            text: `Estadísticas de poder para ${data.name}`,
          },
          data: [
            {
              type: "pie",
              startAngle: 45,
              showInLegend: "true",
              legendText: "{label}",
              indexLabel: "{label} ({y})",
              yValueFormatString: "#,##0.#" % "",
              dataPoints: dataPoints,
            },
          ],
        };
        for (const powers in data.powerstats) {
          dataPoints.push({
            label: powers,
            y: data.powerstats[powers],
          });
        }
        $("#chartContainer").CanvasJSChart(options);
        // Se pinta la información en el html
        $("#heroImage")
          .empty()
          .append(
            `<img src='${data.image.url}' style=" max-width:200px"; "/>  `
          );
        $("#name").text(`Nombre: ${data.name}`);
        $("#connection").text(
          `Conexiones: ${data.connections["group-affiliation"]}`
        );
        $("#published").text(`Publicado por: ${data.biography.publisher}`);
        $("#occupation").text(`Ocupación: ${data.work.occupation}`);
        $("#firstAppearance").text(
          `Primera Aparición: ${data.biography["first-appearance"]}`
        );
        $("#heroHeight").text(`Altura: ${data.appearance.height}`);
        $("#heroWeight").text(`Peso: ${data.appearance.weight}`);
        $("#alliances").text(`Alianzas: ${data.biography.aliases}`);
      },

      error: function (error) {
        console.log("error:", error.error);
      },
    });
  });
});
