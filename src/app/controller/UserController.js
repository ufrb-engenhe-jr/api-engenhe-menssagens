const bcrypt = require('bcrypt');
const UserSchema = require('../../database/UserSchema');

class UserController {
    async signup(req, res) {
        const { name, password, email, types } = req.body
        let r = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;
        if (password.lenght < 8 || r.test(password) === false) return res.status(500).json({ "message": "Senha muito fraca" })
        if (!name || !email) return res.status(500).json({ "message": "O email ou nome estão incompletos" })

        const newPassword = bcrypt.hashSync(password, 8)

        const user = new UserSchema({ name, password: newPassword, email, types })

        try {
            const result = await user.save()
            const data = { id: result.id, name: result.name, email: result.email, types: result.types, created: result.created_at }
            return res.status(201).json({ "message": "Usuario cadastrado com sucesso" })
        } catch (err) {
            if (err.code === 11000) return res.status(500).json({ "message": "Os dados informados já estão sendo utilizados por outro usuario" })
            return res.status(500).json({ "message": "Houve algum erro durante o cadastro: " + err})

        }
    }
}

module.exports = new UserController()