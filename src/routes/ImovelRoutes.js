const router = require('express').Router()
const ImovelController = require('../controllers/ImovelController')

router.post('/cadastrar', ImovelController.cadastrar)
router.get('/listar', ImovelController.listar)
router.get('/buscar/:id', ImovelController.buscar)
router.put('/atualizar/:id', ImovelController.atualizar)
router.delete('/deletar/:id', ImovelController.deletar)


module.exports = router