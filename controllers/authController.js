const db = require('../config/db'); // Importa a configuração do banco de dados 
const bcrypt = require('bcrypt'); // Importa o bcrypt para criptografar senhas 
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken para gerar tokens JWT 
 
// Função para registrar um novo usuário 
const registerCLientes = async (req, res) => { 
  const {nome, email, senha, telefone, endereco, data_cadastro  } = req.body; // Desestrutura os dados do corpo da requisição 
 
 // Verificar se o usuário já existe no banco de dados 
  try { 
    const [existingClientes] = await db.promise().query('SELECT * FROM clientes WHERE email = ?', 
[email]); 
    if (existingClientes.length > 0) { 
      return res.status(400).send('cliente já registrado'); 
    } 
 
    // Criptografar a senha usando bcrypt 
    const hashedsenha = await bcrypt.hash(senha, 10); 
 
    // Inserir o novo usuário no banco de dados 
    await db.promise().query( 
      'INSERT INTO clientes (nome, email, senha, telefone, endereco, data_cadastro) VALUES (?, ?, ?, ?, ?, ?)', 
      [nome, email, senha, telefone, endereco, data_cadastro] 
    ); 
 
    res.status(201).send('Usuário registrado com sucesso'); 
  } catch (err) { 
    console.error('Erro ao registrar usuário:', err); 
    res.status(500).send('Erro ao registrar usuário'); 
  } 
}; 




//--------------------------------------------------------LOGIN---------------------------------------------------------------------------//
 
// Função para autenticar um usuário 
const loginClientes = async (req, res) => { 
  const { email, senha } = req.body; // Desestrutura os dados do corpo da requisição 
 
 // Verificar se o usuário existe no banco de dados 
 
  try { 
    const [senha] = await db.promise().query('SELECT * FROM senha WHERE email = ?', [email]); 
    if (clientes.length === 0) { 
      return res.status(400).send('Credenciais inválidas'); 
    } 
 
    // Comparar a senha fornecida com a senha criptografada no banco de dados 
    const isMatch = await bcrypt.compare(senha, clientes[0].senha); 
    if (!isMatch) { 
      return res.status(400).send('Credenciais inválidas'); 
    } 
 
    // Gerar um token JWT 
    const token = jwt.sign({ clientesId: clientes[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
 
    res.json({ token }); 
  } catch (err) { 
    console.error('Erro ao autenticar usuário:', err); 
    res.status(500).send('Erro ao autenticar usuário'); 
  } 
}; 


//---------------------------------------------------------------------------RECUPERAR SENHA-------------------------------------------------------//

// Função para solicitar redefinição de senha
const requestpasswordReset = async (req, res) => {
    const { email } = req.body;
  
    try {
      const [clientes] = await db.promise().query('SELECT * FROM clientes WHERE email = ?', [email]);
  
      if (clientes.length === 0) {
        return res.status(404).send('Usuário não encontrado');
      }
  
      const token = crypto.randomBytes(20).toString('hex'); // Gera um token aleatório
      const expireDate = new Date(Date.now() + 3600000); // 1 hora para expiração
  
      await db.promise().query('UPDATE clientes SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [token, expireDate, email]);
  
      const resetLink = `http://localhost:3000/reset-senha/${token}`; // Link para redefinição de senha
      sendEmail(email, 'Recuperação de Senha', `Por favor, clique no link para redefinir sua senha: ${resetLink}`);
  
      res.send('E-mail de recuperação de senha enviado');
    } catch (err) {
      console.error('Erro ao solicitar redefinição de senha:', err);
      res.status(500).send('Erro ao solicitar redefinição de senha');
    }
  };



//-------------------------------------------------------------------FUNCAO PARA REDEFINIR SENHA--------------------------------------------------


const resetpassword = async (req, res) => {
    const { token, newpassword } = req.body;
  
    try {
      const [clientes] = await db.promise().query('SELECT * FROM clientes WHERE  > NOW()', [token]);
  
      if (user.length === 0) {
        return res.status(400).send('Token inválido ou expirado');
      }
  
      const hashedpassword = await bcrypt.hash(newpassword, 10); // Criptografa a nova senha
  
      await db.promise().query('UPDATE clientes SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedpassword, clientes[0].id]);
  
      res.send('Senha redefinida com sucesso');
    } catch (err) {
      console.error('Erro ao redefinir senha:', err);
      res.status(500).send('Erro ao redefinir senha');
    }
  };


 
module.exports = { 
  registerCLientes, 
  loginClientes ,
  requestpasswordReset,
resetpassword
};