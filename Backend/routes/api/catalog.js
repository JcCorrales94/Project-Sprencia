const router = require('express').Router()
const Catalog = require('../../models/catalog.model')
const { body, validationResult } = require('express-validator')


// * GET /catalog/ -> Muestra todas las actividades

router.get('/', async (req, res) => {
  try {
    const users = await Catalog.getAll();
    res.json(users)
  } catch (error) {
    res.json({ error: error.message })
  }
});

// * GET /catalog/delete/:catalogId -> Eliminar una actividad por su ID

router.get('/delete/:catalogId', async (req, res) => {
  const catalogId = req.params['catalogId']
  const deleteCatalog = await Catalog.deleteCatalog(catalogId)
  res.redirect('/catalog')
});


// * POST /catalog/new -> Crea una actividad nueva

router.post('/new',
  body('image')
    .exists()
    .withMessage('La imagen es requerida'),
  body('description')
    .exists()
    .withMessage('El campo descripción es requerido'),
  body('summary')
    .exists()
    .withMessage('El campo resumen es requerido'),
  body('price')
    .exists()
    .withMessage('El campo precio es requerido')
  , async (req, res) => {

    // * Recogemos cualquier error que se pueda producir en los validadores y los mostramos

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.mapped())
    };

    // * En caso de no existir errores damos paso a crear la actividad del catálogo

    try {
      const result = await Catalog.create(req.body)
      res.json(result)
    } catch (error) {
      res.json({ error: error.message })
    }

  }
);

// * POST /catalog/update -> Modifica la información de una actividad

router.post('/update', async (req, res) => {
  const result = await Catalog.updateById(req.body.id, req.body)
  res.redirect('/catalog')
});



module.exports = router