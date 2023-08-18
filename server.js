const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

const categoriaRouter = require('./routes/categoria.js');
const productoRouter = require('./routes/producto.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/categoria', categoriaRouter);
app.use('/producto', productoRouter);

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prueba_fianzas',
  password: '1234',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectar a la base de datos:', err);
  }
  console.log('Conexión exitosa a la base de datos');
  release();
});

const Categoria = require('./models/categoria');
const Producto = require('./models/producto');

(async () => {
  try {
    await Categoria.sync();
    console.log('Modelo de Categoria sincronizado correctamente');
    await Producto.sync({ force: true });
    console.log('Modelo de Producto sincronizado correctamente');
  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
})();

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
