const conexao = require('../infraestrutura/database/conexao')
const moment = require('moment')
const repositorio = require ('../repositorios/atendimento')

class Atendimento{
    
    constructor(){
        this.validacoes = [
            {
                nome: 'data',
                mensagem: 'Data deve ser maior ou igual a data atual',
                valido : this.dataEvalida
            },
            {
                nome: 'cliente',
                mensagem: 'Cliente deve ser no minímo 5 caracteres',
                valido : this.clienteEvalido
            }
        ]
        this.dataEvalida = ({data, dataCriacao}) => {moment(data).isSameOrAfter(dataCriacao)}
        this.clienteEvalido = (tamanho)=>{tamanho>=5}
        this.valida = (paramentro)=>{
            this.validacoes.filter(campo=>{
                const {nome} =campo
                const paramentro = paramentros[nome]

                return !campo.valido(parametro)
            })
        }

    }

    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data  = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros ={
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }
        
        const erros = this.valida(parametros)
        const existemErros = erros.length

        if(existemErros){
            return new Promise((resolve, reject)=>reject(erros))
        }
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            return repositorio.adiciona(atendimentoDatado)
                .then((resultados)=>{
                    const id = resultados.insertId
                    return ({...atendimentoDatado, id})
                })
        }

    }
    lista (){
        return repositorio.lista()
    }
    buscaPorId (id, res){
        return repositorio.buscaPorId(id)
    }

    altera(id, valores){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        return repositorio.altera(id,[valores,id])
    }

    deleta(id,res){
        return repositorio.deleta(id)
    }
}

module.exports = new Atendimento