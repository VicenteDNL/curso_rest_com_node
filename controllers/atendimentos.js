const Atendimento =  require('../models/atendimentos')

module.exports = app =>{
    app.get('/atendimentos',(req, res)=>res.send('você está na rota de atendimentos,  na rota GET'))
    app.post('/atendimentos', (req, res)=>{
        const atendimento =req.bod

        Atendimento.adiciona(atendimento)
        res.send('você está na rota de atendimentos na rota POST')
    }
    )
}