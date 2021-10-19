const conexao = require ('./conexao')
const axios = require('axios')

const executaQueryAsync = (query,parametros='') =>{
    return new Promise((resolve,reject)=>{
        conexao.query(query,parametros, async (erros, resultados, campos)=>{

            if(erros){
                reject(erros)
            }else{
                const atendimento = resultados[0]
                const cpf =atendimento.cliente
                const {data} = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
                resolve(atendimento)
            }
        })   
    })

}

module.exports = executaQueryAsync