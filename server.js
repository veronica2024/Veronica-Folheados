const dotenv = require('dotenv'); // Importa o módulo 'dotenv', que carrega variáveis de ambiente de um arquivo '.env' para dentro de 'process.env', permitindo o uso de variáveis de ambiente na aplicação.
dotenv.config();

//------------------------------------------Importar as Bibliotecas-----------------------------------//

const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const db = require('./config/db'); 

//-------------------------------------- Importa as rotas de transações------------------------------------------//

const clientesRoutes = require('./routes/clientes'); 
const authRoutes = require('./routes/auth');

//inicializar nova aplicação Express

const app = express(); 

//configurar o CORS e o bady-Parse

app.use(cors()); 
app.use(bodyParser.json());
// Usar as rotas de clientes para todas as requisições que começam com /api/transactions
app.use('/veronica-folheados/clientes', clientesRoutes); 
app.use('/veronica-folheados/auth', authRoutes);

//---------------------------------Rota inicial para testar o servidor------------------------//

app.get('/', (req, res) => {
  res.send(`Servidor está rodando na porta ${PORT}`); // Define uma rota inicial para testar o servidor
});


const PORT = process.env.PORT || 3000; // Define a porta a partir da variável de ambiente ou usa a porta 3000 como padrão
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Loga uma mensagem informando que o servidor está rodando
});