const db = require('../config/db'); // Importa a configuração do banco de dados 
const bcrypt = require('bcrypt'); // Importa o bcrypt para criptografar senhas 
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken para gerar tokens JWT 
 
// Função para registrar um novo usuário 
const registerClientes = async (req, res) => { 
  const { nome,email,senha,telefone,endereco } = req.body; // Desestrutura os dados do corpo da requisição 
 
 // Verificar se o usuário já existe no banco de dados 
  try { 
    const [existingClientes] = await db.promise().query('SELECT * FROM Clientes WHERE email = ?', 
[email]); 
    if (existingClientes.length > 0) { 
      return res.status(400).send('Usuário já registrado'); 
    } 
 
    // Criptografar a senha usando bcrypt 
    const hashedsenha = await bcrypt.hash(senha, 10); 
 
    // Inserir o novo usuário no banco de dados 
    await db.promise().query( 
      'INSERT INTO users (nome,email,senha,telefone,endereco) VALUES (?, ?, ?, ?)', 
      [nome,email,senha,telefone,endereco] 
    ); 
 
    res.status(201).send('Usuário registrado com sucesso'); 
  } catch (err) { 
    console.error('Erro ao registrar usuário:', err); 
    res.status(500).send('Erro ao registrar usuário'); 
  } 
}; 
