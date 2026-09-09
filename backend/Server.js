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
    const interesAnual = parseFloat(tasaInteres);
    const meses = parseInt(plazoMeses);

    // Validación
    if (
        !nombre ||
        isNaN(prestamo) ||
        isNaN(interesAnual) ||
        isNaN(meses) ||
        prestamo <= 0 ||
        interesAnual < 0 ||
        meses <= 0
    ) {
        return res.status(400).json({
            error: "El nombre, valor del préstamo, tasa de interés o plazo en meses no fueron ingresados correctamente."
        });
    }

    // Convertir tasa anual a mensual
    const interesMensual = interesAnual / 100 / 12;

    let cuota;

    // Caso especial: interés 0%
    if (interesMensual === 0) {
        cuota = prestamo / meses;
    } else {
        cuota =
            prestamo *
            (
                (interesMensual * Math.pow(1 + interesMensual, meses)) /
                (Math.pow(1 + interesMensual, meses) - 1)
            );
    }

    res.json({
        nombre: nombre,
        cuota: cuota,
        prestamo: prestamo,
        tasaInteres: interesAnual,
        meses: meses
    });
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});