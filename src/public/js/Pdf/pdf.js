document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón Exportar PDF
    const $botonPdf = document.querySelector("#btnCrearPdf");
    $botonPdf.addEventListener("click", () => {
        // Obtener el elemento de la factura
        const $elementoParaConvertir = document.querySelector("#factura-container");

        // Generar el PDF
        html2pdf()
            .set({
                margin: 1,
                filename: 'factura.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a2",
                    orientation: 'portrait'
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });

    // Escuchar el click del botón "Enviar a correo"
    const $botonEnviar = document.querySelector("#btnEnviar");
    $botonEnviar.addEventListener("click", () => {
        // Llamar a la función para enviar por correo
        enviarCorreo();
    });

    // Función para enviar la factura por correo electrónico
    function enviarCorreo() {
        // Obtener los datos de la factura
        const facturaPDF = 'factura.pdf'; // Ruta al archivo PDF generado
        const destinatario = 'correo@example.com'; // Correo electrónico del destinatario
        const asunto = 'Factura adjunta'; // Asunto del correo
        const cuerpo = 'Adjunto encontrarás la factura solicitada.'; // Cuerpo del correo

        // Crear un objeto FormData con los datos
        const formData = new FormData();
        formData.append('archivo', facturaPDF);
        formData.append('destinatario', destinatario);
        formData.append('asunto', asunto);
        formData.append('cuerpo', cuerpo);

        // Enviar la solicitud POST al servidor para enviar el correo electrónico
        fetch('/enviar-correo', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Si la solicitud es exitosa, muestra un mensaje de éxito
                alert('La factura se ha enviado por correo electrónico.');
            } else {
                // Si la solicitud falla, muestra un mensaje de error
                alert('Error al enviar la factura por correo electrónico.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar la factura por correo electrónico.');
        });
    }
});