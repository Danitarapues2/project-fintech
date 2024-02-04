
document.addEventListener('DOMContentLoaded', () => {

    const buscar = document.getElementById('buscar');

    buscar.addEventListener('keyup', () => {

        const texto = buscar.value.toLowerCase();
        
        document.querySelectorAll('#table-gestion-clientes tbody tr').forEach(fila => {

            let nombre = fila.querySelector('td:nth-child(1) p').textContent.toLowerCase();
            let apellido = fila.querySelector('td:nth-child(2) p').textContent.toLowerCase();
            let cedula = fila.querySelector('td:nth-child(3) p').textContent.toLowerCase();
            let celular = fila.querySelector('td:nth-child(4) p').textContent.toLowerCase();
            let correo = fila.querySelector('td:nth-child(5) p').textContent.toLowerCase();
            let direccion = fila.querySelector('td:nth-child(6) p').textContent.toLowerCase();

            if (!nombre.includes(texto) && !apellido.includes(texto) && !cedula.includes(texto) && !celular.includes(texto) && !correo.includes(texto) && !direccion.includes(texto)) {
                fila.style.display = 'none';
            } else {
                fila.style.display = '';
            }

        });

    });
});