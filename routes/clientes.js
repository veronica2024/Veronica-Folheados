const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const clientesController = require('../controllers/clientesController.js'); // Importa o controlador de transações 
// Definindo uma rota para obter todas as transações
const authMiddleware = require('../middleware/authMiddleware'); // Importa o middleware de autenticação


router.get('/', clientesController.getAllClientes);

//Definindo uma rota para adicionar uma nova transação
router.post('/', clientesController.addclientes);


//Definindo uma rota para atualizar uma trasação existente(substituição completa)
router.put('/:id', clientesController.updateClientesPut);


//Definindo uma rota para atualizar uma trasação existente(substituição parcial)
router.patch('/:id',  clientesController.updateClientesPatch);


//Definindo uma rota para deletar uma transação
router.delete('/:id', clientesController.deleteclientes);


// Exportando o roteador 
module.exports = router;