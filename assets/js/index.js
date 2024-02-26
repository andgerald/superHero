//luego de pasar la validacion muestra el grafico, cards, oculta la pagina principal.
let mostrar = function () {
  $(".ocultar").show();
  $(".mainImage").hide();
  $("#return").show();
  $("#chartContainer").show();
};
//oculta el grafico,boton volver,etc
let ocultar = function () {
  $(".ocultar").hide();
  $(".mainImage").show();
  $("#heroNumber").val("");
  $("#return").hide();
  $("#chartContainer").hide();
};
$(document).ready(function () {
  //ocultar la card y boton volver
  $(".ocultar").hide();
  $("#return").hide();
  //boton volver ejecuta la  funcion ocultar que se encuentra mas arriba
  $("#return").click(function () {
    ocultar();
  });
  //boton que hace que se ejecute api, funcion mostrar, etc...
  $("#heroButton").click(function (e) {
    e.preventDefault();
    const heroNumber = $("#heroNumber").val();
    //validacion del valor ingresado por el usuario
    const regex = /^[0-9]*$/;
    if (regex.test(heroNumber) === false || heroNumber === "") {
      alert("debes ingresar un número");
      $("#heroNumber").val("");
      return;
    }
    //funcion para mostrar algunos elementos luego de hacer el click
    mostrar();
    //llamado a la api
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
        // en el ternario  utilice el 1 ,ya que con 0 no muestra el grafico y no sabia si era mejor
        // que muestre el espacio en blanco con un alert o dejarlo con valor 1
        for (const powers in data.powerstats) {
          dataPoints.push({
            label: powers,
            y: data.powerstats[powers] == "null" ? 1 : data.powerstats[powers],
          });
        }
        //llamada al grafico
        $("#chartContainer").CanvasJSChart(options);
        //pinta los datos en la cards
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
