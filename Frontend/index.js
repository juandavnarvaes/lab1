const btnCalcular = document.getElementById("calcular");
const tARespuesta = document.getElementById("resultado");

btnCalcular.addEventListener("click", calcularCuota);

async function calcularCuota() {

    const nombre = document.getElementById("nombre").value;
    const prestamo = document.getElementById("valorPrestamo").value;
    const interes = document.getElementById("tasaInteres").value;
    const meses = document.getElementById("plazoMeses").value;

    try {

        const respuesta = await fetch("http://localhost:3000/calcular", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                valorPrestamo: prestamo,
                tasaInteres: interes,
                plazoMeses: meses
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            tARespuesta.value = datos.error;
            return;
        }

        tARespuesta.value =
            "El valor de la cuota mensual para " +
            datos.nombre +
            " es de $" +
            datos.cuota.toFixed(0) +
            ", el valor del préstamo fue de $" +
            datos.prestamo +
            ", la tasa de interés fue de " +
            datos.tasaInteres +
            "% y el plazo en meses fue de " +
            datos.meses;

    } catch (error) {

        tARespuesta.value =
            "No se pudo conectar con el servidor.";

        console.error(error);
    }
}
