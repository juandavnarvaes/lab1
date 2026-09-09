const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
app.use(cors());


app.use(express.json());

app.post("/calcular", (req, res) => {
    const {
        nombre,
        valorPrestamo,
        tasaInteres,
        plazoMeses
    } = req.body;

    const prestamo = parseFloat(valorPrestamo);
    let interes = parseFloat(tasaInteres);
    const meses = parseInt(plazoMeses);

    // Validación
    if (
        !nombre ||
        isNaN(prestamo) ||
        isNaN(interes) ||
        isNaN(meses) ||
        prestamo <= 0 ||
        interes < 0 ||
        meses <= 0
    ) {
        return res.status(400).json({
            error: "El nombre, valor del préstamo, tasa de interés o plazo en meses no fueron ingresados correctamente."
        });
    }


    interes = interes / 100; // Convertir a decimal
    let cuota = ((1+interes)**meses);
    cuota = cuota*interes;
    cuota =cuota/(((1+interes)**meses)-1);
    cuota = cuota*prestamo;


    res.json({
        nombre: nombre,
        cuota: cuota,
        prestamo: prestamo,
        tasaInteres: interes,
        meses: meses
    });
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});