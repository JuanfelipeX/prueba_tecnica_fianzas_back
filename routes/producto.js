const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Producto = require('../models/producto.js');


// Obtener la lista completa de Producto
router.get('/', (req, res) => {
  Producto.findAll()
    .then((producto) => {
      res.json(producto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener la lista de Producto' });
    });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { nombre, categoria_id, precio, valor, stock } = req.body;

  Producto.create({ nombre, categoria_id, precio, valor, stock })
    .then((producto) => {
      res.json(producto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al crear un Nuevo Producto' });
    });
});


// Obtener los detalles de un Producto específico
router.get('/:id', (req, res) => {
  const productoId = req.params.id;

  Producto.findByPk(productoId)
    .then((producto) => {
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los detalles de Producto' });
    });
});

// Actualizar los detalles de un Producto específico
router.put('/:id', (req, res) => {
  const productoId = req.params.id;
  const { nombre, categoria_id, precio, valor, stock } = req.body;

  Producto.findByPk(productoId)
    .then((producto) => {
      if (producto) {
        producto.nombre = nombre;
        producto.categoria_id = categoria_id;
        producto.precio = precio;
        producto.valor = valor;
        producto.stock = stock;
        return producto.save();
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    })
    .then((updatedProducto) => {
      res.json(updatedProducto);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al actualizar los detalles de Producto' });
    });
});

// Eliminar un Producto específico
router.delete('/:id', (req, res) => {
  const productoId = req.params.id;

  Producto.findByPk(productoId)
    .then((producto) => {
      if (producto) {
        return producto.destroy();
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    })
    .then(() => {
      res.json({ message: 'Producto eliminada correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar Producto' });
    });
});

module.exports = router;
