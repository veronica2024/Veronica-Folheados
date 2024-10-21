const db = require('../config/db'); // Importa a conexão com o banco de dados 
 
// Função para obter todas as transações 
const getAllClientes = (req , res) => { 
  db.query('SELECT * FROM clientes', (err, results) => { 
    if (err) { 
      console.error('Erro ao obter clientes:', err); 
      res.status(500).send('Erro ao obter clientes'); 
      return; 
    } 
    res.json(results); 
  }); 
}; 
 
//----------------------------- Com verificação de Duplicidade -------------------------------------------------------------

///Função para adicionar uma nova transação 
const addclientes = (req,res) => {
  const {nome, email, senha, telefone, endereco, data_cadastro } = req.body;

//Verificar se a transação já existe

  db.query(
    'SELECT * FROM cliented WHERE nome=? AND email=? AND senha=? AND telefone=? AND endereco=? AND data_cadastro=?',
    [nome, email, senha, telefone, endereco, data_cadastro ],
    (err,results) => {
      if(err) {
          console.error('Erro ao adicionar cliente', err);
          res.status(500).send('Erro ao adicionar cliente');
          return;
      }

      if(results.length>0){
        //se a transação já existe
        res.status(400).send('cliente duplicada')
      }


// Se a transação não existe, insira-a no banco de dados 
  db.query(
      'INSERT INTO clientes (nome, email, senha, telefone, endereco, data_cadastro ) VALUES (?,?,?,?,?,?)',
      [nome, email, senha, telefone, endereco, data_cadastro ],
      (err,results) => {
          if(err) {
              console.error('Erro ao adicionar cliente', err);
              res.status(500).send('Erro ao adicionar cliente');
              return;
          }          
          res.status(201).send('cliente adicionada com sucesso');
      }

  );
}
);
};





//----------------- Verificar se a Transação Existe (PUT, PATH, DELETE)---------------------------------------------------

//Função para atualizar uma transação existente (substituição completa)
const updateClientesPut = (req, res) => {
const{id} = req.params;
const {} = req.body;
db.query(
'UPDATE clientes SET nome = ?, senha = ?, telefone = ?, endereco = ?, data_cadastro = ?, WHERE id = ?',
[nome, email, senha, telefone, endereco, data_cadastro],
(err,results) => {
if(err) {
    console.error('Erro ao atualizar transação', err);
    res.status(500).send('Erro ao adicionar cliente');
return;
}

// verifica se nenhuma linha foi afetada pela consulta
if(results.affectedRows===0){
res.status(404).send('cliente não encontrada');
return;
}

res.send(' atualizado com sucesso');
}
);
};


//Função para atualizar uma transação existente (substituição parcial)
const updateClientesPatch = (req, res) => {
const{id} = req.params;
const fields = req.body;
const query = [];
const values = [];

for(const[key,value] of Object.entries(fields)) {
query.push (`${key} = ?`);
values.push(value);
} 

values.push(id);

db.query(
`UPDATE clientes SET ${query.join(',')} WHERE id = ?`,
values,
(err,results) => {
if(err) {
    console.error('Erro ao atualizar', err);
    res.status(500).send('Erro ao adicionar cliente');
return;
}

// verifica se nenhuma linha foi afetada pela consulta
if(results.affectedRows===0){
res.status(404).send('cliente não encontrada');
return;
}

res.send('atualizado com sucesso');
}
);
};


//Função para deletar uma transação existente

const deleteclientes = (req,res) => {
const{id} = req.params;
db.query('DELETE FROM clientes WHERE id = ?',[id],
(err,results) => {
if(err) {
    console.error('Erro ao deletar cliente', err);
    res.status(500).send('Erro ao deletar cliente');
return;
}

// verifica se nenhuma linha foi afetada pela consulta
if(results.affectedRows===0){
res.status(404).send('cliente não encontrado');
return;
}

res.send('cliente deletado com sucesso');
}
);
};


module.exports = { 
getAllClientes, 
addclientes,
updateClientesPut,
updateClientesPatch,
deleteclientes
};