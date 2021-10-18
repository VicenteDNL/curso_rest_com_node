const Atendimento =  require('../models/atendimentos')

module.exports = app =>{
    app.get('/atendimentos',(req, res)=>{
        Atendimento.lista(res)
    })
    app.get('/atendimentos/:id',(req, res)=>{
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id,res)
    })
    app.patch('/atendimentos/:id',(req, res)=>{
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.altera(id,valores,res)
    })
    app.post('/atendimentos', (req, res)=>{
        const atendimento =req.body
        Atendimento.adiciona(atendimento)
        .then(atendimentoCadastrado=>res.status(201).json(atendimentoCadastrado))
        .catch(erros=> res.status(404).json(erros))
    })
    app.delete('/atendimentos/:id',(req, res)=>{
        const id = parseInt(req.params.id)
        Atendimento.deleta(id,res)
    })


}