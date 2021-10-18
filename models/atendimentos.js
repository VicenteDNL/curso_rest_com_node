const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Atendimento{
    adiciona(atendimento,res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data  = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataEvalida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEvalido = atendimento.cliente.length >=5

        const validacoes = [
            {
                nome: 'data',
                mensagem: 'Data deve ser maior ou igual a data atual',
                valido : dataEvalida
            },
            {
                nome: 'cliente',
                mensagem: 'Cliente deve ser no minímo 5 caracteres',
                valido : clienteEvalido
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?' 
            conexao.query(sql,atendimentoDatado, (erro, resultado)=>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(atendimentoDatado)
                }
            })
        }

       

    }
    lista (res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql,(erro,resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }
    buscaPorId (id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id= ${id}`

        conexao.query(sql,(erro,resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados[0])
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = `UPDATE Atendimentos SET ? WHERE id= ? `

        conexao.query(sql,[valores,id],(erro,resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id,res){
        const sql = `DELETE FROM Atendimentos WHERE id= ${id}`

        conexao.query(sql,(erro,resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })  
    }
}

module.exports = new Atendimento