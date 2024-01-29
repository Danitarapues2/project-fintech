const app = require('./app');

const port = app.get('port');
app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});