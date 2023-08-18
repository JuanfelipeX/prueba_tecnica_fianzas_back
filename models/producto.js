const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('prueba_fianzas', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const Categoria = require('./categoria'); // Importa el modelo de Categoria

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categoria', // Nombre del modelo de Categoria
      key: 'id', // Nombre de la columna de clave primaria en la tabla de Categoria
    },
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

Producto.belongsTo(Categoria, { foreignKey: 'categoria_id' });

Producto.sync()
  .then(() => {
    console.log('Producto sincronizado correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de Producto:', error);
  });

module.exports = Producto;
