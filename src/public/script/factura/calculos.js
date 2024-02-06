// Obtener referencia a los inputs
const cantidadInput = document.querySelector('input[name="cantidad"]');
const precioUnitarioInput = document.querySelector('input[name="precio_unitario"]');
const precioTotalInput = document.querySelector('input[name="precio_total"]');

// Agregar listener al evento input
cantidadInput.addEventListener('input', calcularPrecioTotal);
precioUnitarioInput.addEventListener('input', calcularPrecioTotal);

function calcularPrecioTotal() {
  // Obtener valores
  const cantidad = parseFloat(cantidadInput.value) || 0;
  const precioUnitario = parseFloat(precioUnitarioInput.value) || 0;
  
  // Calcular precio total
  const precioTotal = cantidad * precioUnitario;
  
  // Asignar al campo de precio total
  precioTotalInput.value = precioTotal;
}

