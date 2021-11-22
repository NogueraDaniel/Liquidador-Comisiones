var mostrar;

function mostrarForm(elemento) {

    //Siempre que apreto el boton Liquidar Comision, oculto el cuadro de resultado
    $("#resultado").fadeOut(250);
    $("#resultado").addClass('hide');


    // Uso la variable global "mostrar" para mostrar el cuadro de calculo
    if (mostrar) {
        //Oculto el elemento
        $(elemento).fadeOut(250);
      
        mostrar = false;
    } else {
        //Muestro el elemento
        $(elemento).fadeIn(500);
        $(elemento).removeClass('hide');
        mostrar = true;
    }

}

function crearCalculo() {

    //Oculto el cuadro de calculo:
    $("#formulario").addClass('hide');
    $("#resultado").fadeIn(750);
    $("#resultado").removeClass('hide');
    mostrar = false;

    //INGRESO LOS DATOS EN LAS ETIQUETAS SPAN:

    let ventasIngresadas = $("#ventas").val();
    let litrosIngresados = $("#litros").val();
    let vendedor = $("#vendedores").val();
    let mes = $("#meses").val();
    let litrosObjetivo = obtenerLitrosObjetivo(mes);
    let porcLitros = (litrosIngresados / litrosObjetivo) * 100;
    let litrosFaltantes = ((litrosObjetivo * 0.7) - litrosIngresados);
    let comision;


    $("#total-ventas").html("$ " + ventasIngresadas);
    $("#vendedor").html(vendedor);
    $("#mes").html(mes);
    $("#objetivo").html(litrosObjetivo)
    $("#total-litros").html(litrosIngresados);
    $("#porc-litros").html((porcLitros).toFixed(2) + " %");

    // BARRA PROGRESO
    if (porcLitros <= 49.99) {
        $("#barraProgreso").css("background-color", "red");
    } else {
        if (porcLitros <= 69.99) {
            $("#barraProgreso").css("background-color", "#ffa809");
        } else {
            if (porcLitros <= 99.99) {
                $("#barraProgreso").css("background-color", "#55d315");
            } else {
                if (porcLitros >= 100) {
                    $("#barraProgreso").css("background-color", "#4b61ff");
                }

            }
        }
    }

    $("#barraProgreso").html((porcLitros).toFixed(2) + " %");
    $("#barraProgreso").css({ "width": porcLitros + "%" });

    // COMISION:

    if (porcLitros < 99.99) {

        comision = ventasIngresadas * 0.007;

    } else {

        comision = ventasIngresadas * 0.01;

    }

    $("#comision").html("$ " + comision.toFixed(2));

    // RESULTADO

    let resultado;

    if (porcLitros < 70) {

        resultado = "No se alcanzo el 70% del objetivo. Faltan " + litrosFaltantes.toFixed(2) + " litros para alcanzar la comision"

    } else {

        if (porcLitros <= 99) {

            resultado = "Comision alcanzada en rango del 70 al 99% del objetivo cumplido";

        } else {

            resultado = "Comision alcanzada con el 100% del objetivo cumplido";
        }

    }

    $("#resultadoTotal").html(resultado);



}

function obtenerLitrosObjetivo(mes) {

    switch (mes) {
        case "ENERO":
            objetivo = 8000;
            break;
        case "FEBRERO":
            objetivo = 8000;
            break;
        case "MARZO":
            objetivo = 9000;
            break;
        case "ABRIL":
            objetivo = 9000;
            break;
        case "MAYO":
            objetivo = 9500;
            break;
        case "JUNIO":
            objetivo = 11000;
            break;
        case "JULIO":
            objetivo = 12000;
            break;
        case "AGOSTO":
            objetivo = 12500;
            break;
        case "SEPTIEMBRE":
            objetivo = 14000;
            break;
        case "OCTUBRE":
            objetivo = 14500;
            break;
        case "NOVIEMBRE":
            objetivo = 16000;
            break;
        case "DICIEMBRE":
            objetivo = 16500;
            break;
    }

    return objetivo;
}



function validarNumeros(elemento, campo) {

    let valor = /^\d+(\.\d{1,2})?$/;
    let retorno = true;

    if (!elemento.value.match(valor)) {
        alert("Debe completar el campo " + campo + " con un numero positivo")
        retorno = false;
    }

    return retorno;
}

function validarDatos(elemento1, elemento2) {

    let resultado = true;
    let campo1 = "Litros";
    let campo2 = "Ventas";

    if (elemento1.value == "") {

        alert("Debe completar el campo " + campo1);

        resultado = false;

    } else {

        if (!validarNumeros(elemento1, campo1)) {

            resultado = false;
        }

    }

    if (elemento2.value == "") {

        alert("Debe completar el campo " + campo2);

        resultado = false;

    } else {

        if (!validarNumeros(elemento2, campo2)) {

            resultado = false;
        }

    }

    if (resultado) {
        crearCalculo();
    }

}