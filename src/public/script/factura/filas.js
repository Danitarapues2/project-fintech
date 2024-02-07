const addButton = document.getElementById("add-row");
const removeButton = document.getElementById("remove-row");
const table = document.getElementById("detalle_factura");

// Función para calcular el precio total
function calcularPrecioTotal() {
    const filas = table.querySelectorAll('.fila_cada_producto');
    filas.forEach(fila => {
        const cantidad = parseFloat(fila.querySelector('input[name="cantidad"]').value);
        const precioUnitario = parseFloat(fila.querySelector('input[name="precio_unitario"]').value);
        const precioTotal = isNaN(cantidad) || isNaN(precioUnitario) ? 0 : cantidad * precioUnitario;
        fila.querySelector('input[name="precio_total"]').value = precioTotal.toFixed(2);
    });
}

// Evento para agregar nueva fila
addButton.addEventListener("click", function () {
    const newRow = table.rows[1].cloneNode(true);
    const inputs = newRow.getElementsByTagName("input");
    const firstRowInputs = table.rows[1].getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ""; // Asignar valores vacíos a los inputs de la nueva fila
        inputs[i].removeAttribute("readonly"); // Habilitar edición para la nueva fila
    }
    table.appendChild(newRow);

    // Calcular precio total después de agregar la nueva fila
    calcularPrecioTotal();
});

// Evento para calcular precio total cuando se modifican los valores
table.addEventListener('input', function (event) {
    if (event.target.matches('input[name="cantidad"]') || event.target.matches('input[name="precio_unitario"]')) {
        calcularPrecioTotal();
    }
});


removeButton.addEventListener("click", function () {
    const rows = table.getElementsByTagName("tr");
    if (rows.length > 2) {
        table.removeChild(rows[rows.length - 1]);
    } else {
        alert("No se pueden eliminar más filas");
    }
});
