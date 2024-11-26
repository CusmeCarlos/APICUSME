import app from './app.js';

const PORT = process.env.PORT || 3000; // Usa el puerto dinámico de Railway o un valor predeterminado
app.listen(PORT, () => {
    console.log(`Servidor está ejecutando en el puerto ${PORT}`);
});
