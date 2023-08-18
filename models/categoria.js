const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('prueba_fianzas', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const Categoria = sequelize.define('Categoria', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
});

Categoria.sync()
  .then(() => {
    console.log('Categoria sincronizado correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de Categoria :', error);
  });

module.exports = Categoria;
