const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const clientesController = require('../controllers/clienteController'); // Importa o controlador de transações 
// Definindo uma rota para obter todas as transações 
router.get('/', authMiddleware,clientesController.getAllClientes);

const authMiddleware = require('../middleware/authMiddleware'); // Importa o middleware de autenticação


//Definindo uma rota para adicionar uma nova transação
router.post('/', authMiddleware, clientesController.addclientes);


//Definindo uma rota para atualizar uma trasação existente(substituição completa)
router.put('/:id', authMiddleware, clientesController.updateclientesPut);


//Definindo uma rota para atualizar uma trasação existente(substituição parcial)
router.patch('/:id', authMiddleware,  clientesController.updateclientesPatch);


//Definindo uma rota para deletar uma transação
router.delete('/:id', authMiddleware, clientesController.deleteclientes);

























// Exportando o roteador 
module.exports = router;