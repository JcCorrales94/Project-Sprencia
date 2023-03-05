const router = require('express').Router();
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../../helpers/utils');

router.get('/', async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users)

  } catch (error) {
    res.json({ error: error.message })
  }
})


router.post('/register',
  body('name')
    .exists()
    .withMessage('El campo nombre es requerido.')
    .isLength({ min: 2 })
    .withMessage('El campo nombre debe tener una longitud mínima de 2 caracteres.'),
  body('surname')
    .exists()
    .withMessage('El campo apellido es requerido.'),
  body('city')
    .exists()
    .withMessage('El campo ciudad es requerido.'),
  body('email')
    .exists()
    .withMessage('El campo email es requerido.')
    .matches(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage('Debe tener formato correcto. Ejemplo: correo@correo.com.'),
  body('password')
    .exists()
    .withMessage('El campo contraseña es requerido.')
    .isLength({ min: 8 })
    .withMessage('El campo contraseña debe tener una longitud mínima de 8 caracteres.')
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
    .withMessage('El campo contraseña debe tener como mínimo 8 caracteres, almenos un caracter numérico, una mayúscula y un caracter especial.')
  , async (req, res) => {

    // * Recogemos cualquier error que se pueda produccir en los validadores y los mostramos

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.mapped())
    };

    // * En caso de no existir errores damos paso a crear el usuario

    try {
      req.body.password = bcrypt.hashSync(req.body.password, 11);
      const result = await User.create(req.body)
      res.json(result)


    } catch (error) {
      res.json({ error: 'Ya existe una cuenta con ese correo electrónico.' })
    }
  }
)

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  // * ¿Existe el email en la BBDD?

  const user = await User.getByEmail(email);
  if (!user) {
    return res.json({ error: 'Error en email y/o contraseña (1)' }) //? Uso un indicador númerico para identificar en caso de error, donde se encuentra el error.
  }

  // * ¿Coinciden las contraseñas?

  const equals = bcrypt.compareSync(password, user.password)
  if (!equals) {
    return res.json({ error: 'Error en email y/o contraseña (2' })
  }

  const token = createToken(user)

  res.json({
    success: '¡Login Correcto!',
    token
  })

})




module.exports = router