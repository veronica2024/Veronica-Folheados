const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const vendasController = require('../controllers/vendasController'); // Importa o controlador de transações 

// Definindo uma rota para obter todas as transações 
router.get('/',vendasController.getAllVendas);

// Definindo uma rota para adicionar uma nova transação 
router.post('/', vendasController.addVendas);

// Definindo uma rota para adicionar uma nova transação 
router.put('/', vendasController.updateVendasput);




















// Exportando o roteador 
module.exports = router;