const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Categoria = require('../models/categoria.js');


// Obtener la lista completa de Categoria
router.get('/', (req, res) => {
  Categoria.findAll()
    .then((categoria) => {
      res.json(categoria);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener la lista de Categoria' });
    });
});

// Crear un nuevo Categoria
router.post('/', (req, res) => {
  const { nombre, descripcion } = req.body;

  Categoria.create({ nombre, descripcion })
    .then((categoria) => {
      res.json(categoria);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al crear un Nuevo Categoria' });
    });
});


// Obtener los detalles de un Categoria
router.get('/:id', (req, res) => {
  const categoriaId = req.params.id;

  Categoria.findByPk(categoriaId)
    .then((categoria) => {
      if (categoria) {
        res.json(categoria);
      } else {
        res.status(404).json({ error: 'Categoria no encontrado' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los detalles de Categoria' });
    });
});

// Actualizar los detalles de un Categoria específico
router.put('/:id', (req, res) => {
  const categoriaId = req.params.id;
  const { nombre, descripcion } = req.body;

  Categoria.findByPk(categoriaId)
    .then((categoria) => {
      if (categoria) {
        categoria.nombre = nombre;
        categoria.descripcion = descripcion;
        return categoria.save();
      } else {
        res.status(404).json({ error: 'Categoria no encontrado' });
      }
    })
    .then((updatedCategoria) => {
      res.json(updatedCategoria);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al actualizar los detalles de Categoria' });
    });
});

// Eliminar un Categoria específico
router.delete('/:id', (req, res) => {
  const categoriaId = req.params.id;

  Categoria.findByPk(categoriaId)
    .then((categoria) => {
      if (categoria) {
        return categoria.destroy();
      } else {
        res.status(404).json({ error: 'Categoria no encontrado' });
      }
    })
    .then(() => {
      res.json({ message: 'Categoria eliminada correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar Categoria' });
    });
});

module.exports = router;
