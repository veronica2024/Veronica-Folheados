
const mysql = require('mysql2'); // Alterar para mysql2 
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