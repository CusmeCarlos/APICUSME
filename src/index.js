// src/index.js
import app from './app.js';  // Importa la instancia de app desde app.js
import { PORT } from './config.js';  // Importa el puerto desde config.js

app.listen(PORT, () => {
  console.log(`Servidor está ejecutando en el puerto ${PORT}`);
});
