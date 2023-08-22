const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('prueba_fianzas', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DOUBLE,
  },
  valor: {
    type: DataTypes.DOUBLE,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
});

Producto.sync()
  .then(() => {
    console.log('Producto sincronizado correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de Producto:', error);
  });

module.exports = Producto;
