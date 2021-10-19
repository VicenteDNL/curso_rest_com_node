 const query = require('../infraestrutura/database/queries')
 const queryAsync = require ('../infraestrutura/database/queriesAsync')

class Atendimento {
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?' 
        return query(sql,atendimento)
    }

    lista(){
        const sql = 'SELECT * FROM Atendimentos'
        return query(sql)
    }

    buscaPorId(id){
        const sql = `SELECT * FROM Atendimentos WHERE id = ?`
        return queryAsync(sql,id)
    }
    altera(id, valores){
        const sql = `UPDATE Atendimentos SET ? WHERE id = ? `
        return query(sql,valores)

    }
    deleta(id){
        const sql = `DELETE FROM Atendimentos WHERE id = ?`
        return query(sql,id)
    }

}
module.exports = new Atendimento()