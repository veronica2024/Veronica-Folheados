const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const clientesController = require('../controllers/clienteController'); // Importa o controlador de transações 
// Definindo uma rota para obter todas as transações 
router.get('/',clientesController.getAllClientes); 
// Exportando o roteador 
module.exports = router;