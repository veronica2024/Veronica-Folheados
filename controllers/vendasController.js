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
    const {cliente_id, data_venda, valor_total } = req.body; 
    db.query( 
      'INSERT INTO vendas ( cliente_id, data_venda, valor_total ) VALUES (?, ?, ?)', 
      [cliente_id, data_venda, valor_total], 
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






//--------------------- Função para atualizar uma transação existente (substituição completa) 
const updateVendasput = (req, res) => { 
    const { id } = req.params; 
    const {cliente_id, data_venda, valor_total } = req.body; 
    db.query( 
      'UPDATE vendas SET cliente_id = ?, data_venda = ?, valor_total = ?, WHERE id = ?', 
      [cliente_id, data_venda, valor_total,  id], 
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










//----------------------------------- Função para atualizar um produto existente (atualização parcial)
const updateVendasPatch = (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const query = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    query.push(`${key} = ?`);
    values.push(value);
  }

  values.push(id);

  db.query(
    `UPDATE vendas SET ${query.join(', ')} WHERE id = ?`,
    values,
    (err, results) => {
      if (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send('Erro ao atualizar produto');
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send('vendas não encontrado');
        return;
      }
      res.send('vendas atualizado com sucesso');
    }
  );
};

 



// -----------------------------------------------Função para deletar uma transação existente 
const deleteVendas = (req, res) => { 
  const { id } = req.params; 
  db.query('DELETE FROM vendas WHERE id = ?', [id], (err, results) => { 
    if (err) { 
      console.error('Erro ao deletar venda:', err); 
      res.status(500).send('Erro ao deletar venda'); 
      return; 
    } 
    res.send('venda deletada com sucesso'); 
  }); 
}; 




module.exports = { 
    getAllVendas,
    addVendas,
    updateVendasput,
    updateVendasPatch,
    deleteVendas,

    };