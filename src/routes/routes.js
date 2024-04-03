const express = require('express')
const router = express.Router()
const {home} = require ('../controller/controller')


router.get('/testApi',home.testApi)


router.get('/testCredenciales',home.testCredenciales)

router.get('/testEmail',home.testEmailSend)



// Manejar excepciones
router.use((req, res, next) => {
  res.status(404).json({"rspta": "Ruta no encontrada"});
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({"rspta": "Error interno"});
});


module.exports = router