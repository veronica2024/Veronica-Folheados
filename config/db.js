
const mysql = require('mysql2'); // Alterar para mysql2

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

// Cria a conexão com o banco de dados u lizando as variáveis de ambiente 
const db = mysql.createConnection({ 
host: process.env.DB_HOST, 
user: process.env.DB_USER, 
password: process.env.DB_PASS, 
database: process.env.DB_NAME 
}); 
// Conecta ao banco de dados e exibe uma mensagem de sucesso ou erro 
db.connect((err) => { 
if (err) { 
console.error('Erro ao conectar ao banco de dados:', err); 
return; 
} 
console.log('Conectado ao banco de dados MySQL'); 
}); 
module.exports = db;