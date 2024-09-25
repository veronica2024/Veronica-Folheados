const db = require('../config/db'); // Importa a conexão com o banco de dados 

// Função para obter todas as transações 
const getAllVendas = (req, res) => { 
db.query('SELECT * FROM vendas', (err, results) => { 
if (err) { 
console.error('Erro ao obter vendas:', err); 
res.status(500).send('Erro ao obter vendas'); 
return; 
} 
res.json(results); 
}); 
};




// ---------------------------------------Função para adicionar uma nova transação 
const addVendas = (req, res) => { 
    const { venda_id, cliente_id, data_venda, valor_total } = req.body; 
    db.query( 
      'INSERT INTO vendas (venda_id, cliente_id, data_venda, valor_total ) VALUES (?, ?, ?, ?)', 
      [venda_id, cliente_id, data_venda, valor_total], 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao adicionar vendas:', err); 
          res.status(500).send('Erro ao adicionar vendas'); 
          return; 
        } 
        res.status(201).send('venda adicionada com sucesso'); 
      } 
    ); 
  };



// Função para atualizar uma transação existente (substituição completa) 
const updateVendasPut = (req, res) => { 
    const { id } = req.params; 
    const { venda_id, cliente_id, data_venda, valor_total } = req.body; 
    db.query( 
      'UPDATE vendas SET venda_id = ?, cliente_id = ?, data_venda = ?, valor_total = ?, WHERE id = ?', 
      [venda_id, cliente_id, data_venda, valor_total,  id], 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao atualizar vendas:', err); 
          res.status(500).send('Erro ao atualizar vendas'); 
          return; 
        } 
        res.send('vendas atualizada com sucesso'); 
      } 
    ); 
  };



















module.exports = { 
    getAllVendas,
    addVendas,
    updateVendasput

    };