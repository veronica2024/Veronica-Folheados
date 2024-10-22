const mysql = require('mysql2'); // Importa o módulo 'mysql2', que será utilizado para criar conexões e interagir com um banco de dados MySQL na aplicação.

//------------------------------------- Exibe as variáveis de ambiente carregadas----------------------------------------//

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

const db = mysql.createConnection({
  host: process.env.DB_HOST, // Endereço do servidor de banco de dados
  user: process.env.DB_USER, // Nome de usuário para acessar o banco de dados
  password: process.env.DB_PASS, // Senha do usuário para acessar o banco de dados
  database: process.env.DB_NAME // Nome do banco de dados a ser acessado
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err); // Exibe mensagem de erro
    return;
  }
  console.log(`Conectado ao banco de dados ${process.env.DB_NAME}`); // Exibe mensagem de sucesso
});

// Exporta o objeto 'db', que representa a conexão com o banco de dados, para que ele possa ser utilizado em outras partes da aplicação.
module.exports = db;