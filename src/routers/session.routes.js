import { Router } from "express";
import { userModel } from "../dao/models/users.models.js";

const sessionRouter = Router ()

sessionRouter.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        if(req.session.login) {
            res.status (200). send ({resultado: 'login ya existente'})
        } 

        const user = await userModel.findOne({email: email})

        if(user) {
           if (user.password === password) {
            req.session.login = true
            res.status (200). send ({resultado: 'login valido', message: user })
           } else {
            res.status (401). send ({resultado: 'Contraseña no validar', message: password})
           }
        } else {
            res.status(404). send({resultado: 'not found', message: user})
        }


    } catch (error) {
        res.status(404).send({erorr: `Error en login: ${error}`})
    }

})

sessionRouter.get('/logout', (req,res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    res.status(200). send({resultado: 'Usuario deslogeado'})
})

export default sessionRouter