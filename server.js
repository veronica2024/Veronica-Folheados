//importar as bibliotecas 

const db = require('./config/db'); // Importa a conexão com o banco de dados
const clientesRoutes = require('./routes/clientes'); // Importa as rotas de transações

const authRoutes = require('./routes/auth'); // Importa as rotas de autenticação



const express = require('express'); // Importa o framework Express 
const dotenv = require('dotenv'); // Importa o pacote dotenv para gerenciar variáveis de ambiente 
const cors = require('cors'); // Importa o pacote cors para permi r requisições de diferentes origens 
const bodyParser = require('body-parser'); // Importa o pacote body-parser para analisar o corpo das requisições HTTP


//configurar as variáveis de ambiente 
dotenv.config(); // Carrega as variáveis definidas no arquivo .env para process.env

//Inicializa uma nova aplicação Express 
const app = express(); // Inicializa uma nova aplicação Express


//Configura o CORS e o body-parser 
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(bodyParser.json()); // Configura o body-parser para analisar requisições JSON 

app.use('/api/clientes', clientesRoutesRoutes);


app.use('/api/auth', authRoutes); // Configura o servidor para usar as rotas de


//Rota inicial para testar o servidor 
app.get('/', (req, res) => { 
  res.send('Servidor está rodando'); // Define uma rota inicial para testar o servidor 
  });


// Configura o servidor para escutar em uma porta específica 
const PORT = process.env.PORT || 3000; // Define a porta a par r da variável de ambiente ou usa a porta 3000 como padrão 
app.listen(PORT, () => { 
console.log(`Servidor rodando na porta ${PORT}`);  
}); // Escreve uma mensagem informando que o servidor está rodando















