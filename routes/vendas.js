const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const vendasController = require('../controllers/vendasController'); // Importa o controlador de transações 

const authMiddleware = require('../middlewares/authMiddleware'); // Importa o middleware de autenticação 


// Definindo uma rota para obter todas as transações 
router.get('/',authMiddleware,vendasController.getAllVendas);

// Definindo uma rota para adicionar uma nova transação 
router.post('/',authMiddleware,vendasController.addVendas);

// Definindo uma rota para adicionar uma nova transação 
router.put('/',authMiddleware,vendasController.updateVendasput);


// Definindo uma rota para adicionar uma nova transação 
router.patch('/',authMiddleware,vendasController.updateVendasPatch);


// Definindo uma rota para adicionar uma nova transação 
router.delete('/',authMiddleware,vendasController.deleteVendas);


















// Exportando o roteador 
module.exports = router;