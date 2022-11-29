const  MenssagensSchema = require('../../database/MenssagensSchema');

class MenssagensController {
    async create(req, res) {
        const {name, email, menssagem} = req.body
        if (!name || !menssagem || !email) return res.status(500).json({"menssage": "Campos obrigatórios não foram preenchidos."})
        
        try {
            const result = await MenssagensSchema(req.body).save()
            return res.status(200).json(result)
        }
        catch (err) {
            return res.status(500).json({"menssage": "Erro ao enviar."})
        }
    };
    async list(req, res){
        const menssages = await MenssagensSchema.find({},{_id:1, name:1, email:1, done:1, created_at:1})
        return res.status(200).json(menssages)
    }
    async done(req, res) {
        const {id} = req.params
        const {done} = req.body
        try {
            const result = await MenssagensSchema.updateOne({_id:id}, {$set:{done:done}})
            return res.status(200).json(result)
        }
        catch (err) {
            return res.status(500).json({"menssage": "Erro ao enviar."})
        }
    }
}

module.exports = new MenssagensController()
