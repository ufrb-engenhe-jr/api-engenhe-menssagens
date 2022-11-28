const jwt = require("jsonwebtoken")
const hash = require("../config/secret.json")
const { decode } = require("jsonwebtoken")
const { promissify } = require("util")
const UserSchema = require('../../database/UserSchema')
const { response } = require("express")


class ValidationUser {
    async validateToken(req, res, next) {
        {
            const header = request.headers.authorization;
            if (!header) {
                return response.status(401).send({ error: "token de autenticação inválido" });
            }
            try {
                const decoded = await promissify(jwt.verify)(authorization, hash.auth)

                req.id_user = decoded._id

                return next()

            } catch (err) {
                res.status(500).send({ "menssage": "Token invalido" })
            }
        }
    }
    async validateUserRoot(req, res, next) {
        const header = request.headers.authorization;
        if (!header) {
            return response.status(401).send({ error: "token de autenticação inválido" });
        }
        try {
            const decoded = await promissify(jwt.verify)(authorization, hash.auth)

            const user = await UserSchema.findOne({ _id: decoded._id })
            if (user.types === "ROOT") return next()
            return res.status(404).json({ "message": "Não autorizado" })

        } catch (err) {
            res.status(500).send({ "menssage": "Token invalido" })
        }
    }
}

module.exports = new ValidationUser()