const { PORT } = require('./src/config/config');
const app = require('./app');


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});