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

    calcularSubtotal();
    calcularBaseImponible();
    calcularDescuento();
    calcularIVA();
    calcularValorTotal();
}


//calcular Subtotal

function calcularSubtotal() {
    const precioTotalInputs = document.querySelectorAll('input[name="precio_total"]');
    let subtotal = 0;

    precioTotalInputs.forEach(input => {
        const precioTotal = parseFloat(input.value);
        if (!isNaN(precioTotal)) {
            subtotal += precioTotal;
        }
    });

    const subtotalInput = document.getElementById('sub_total');
    if (!isNaN(subtotal)) {
        subtotalInput.value = subtotal.toFixed(2);
    } else {
        subtotalInput.value = "";
    }
}

//Calcular Base Imponible
function calcularBaseImponible() {
    const impuesto_0Input = document.querySelector('input[name="impuesto_0"]');
    const impuesto_12Input = document.querySelector('input[name="impuesto_12"]');

    impuesto_0Input.value = '0.00';
    impuesto_12Input.value = '0.00';

    const precioTotalInputs = document.querySelectorAll('input[name="precio_total"]');

    precioTotalInputs.forEach(input => {
        const precioTotal = parseFloat(input.value);
        if (!isNaN(precioTotal)) {
            const precioUnitario = parseFloat(input.parentNode.parentNode.querySelector('input[name="precio_unitario"]').value);
            if (precioUnitario == 0) {
                impuesto_0Input.value = (parseFloat(impuesto_0Input.value) + precioTotal).toFixed(2);
            } else {
                impuesto_12Input.value = (parseFloat(impuesto_12Input.value) + precioTotal).toFixed(2);
            }
        }
    });
}

//Descuento
function calcularDescuento() {
    const descuentoInput = document.querySelector('input[name="descuento"]');
    const descuento = parseFloat(descuentoInput.value);

    if (!isNaN(descuento)) {
        calcularValorTotal();
    }
}

// Agregar event listener al input de descuento
const descuentoInput = document.querySelector('input[name="descuento"]');
descuentoInput.addEventListener('input', calcularDescuento);

//Calcular IVA
function calcularIVA() {
    const impuesto_12 = parseFloat(document.querySelector('input[name="impuesto_12"]').value);
    const valorIVAInput = document.querySelector('input[name="valor_iva"]');

    if (!isNaN(impuesto_12)) {
        const valorIVA = (impuesto_12 * 0.12).toFixed(2);
        valorIVAInput.value = valorIVA;
    }
    calcularValorTotal();
}

//Calcular Valor Total
function calcularValorTotal() {
    const subtotal = parseFloat(document.getElementById('sub_total').value);
    const valorIVA = parseFloat(document.querySelector('input[name="valor_iva"]').value);
    const descuento = parseFloat(document.querySelector('input[name="descuento"]').value);
    const valorTotalInput = document.querySelector('input[name="valor_total"]');

    if (!isNaN(subtotal) && !isNaN(valorIVA) && !isNaN(descuento)) {
        const valorTotal = (subtotal + valorIVA - descuento).toFixed(2);
        valorTotalInput.value = valorTotal;
    } else {
        valorTotalInput.value = "";
    }
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
        calcularSubtotal();
        calcularBaseImponible();
        calcularDescuento();
        calcularIVA();
        calcularValorTotal();
    }
});

// Evento para eliminar una fila
removeButton.addEventListener("click", function () {
    const rows = table.getElementsByTagName("tr");
    if (rows.length > 2) {
        table.removeChild(rows[rows.length - 1]);
        calcularSubtotal();
        calcularBaseImponible();
        calcularDescuento();
        calcularIVA();
        calcularValorTotal();

    } else {
        alert("No se pueden eliminar más filas");
    }
});
