import passport from "passport";

// Funcion general para retornar errores de las estrategias de passport

export const passportError = (strategy) => { //voy a enviar local, github o jwt
    return async (req,res, next) => { 
        passport.authenticate (strategy, (error, user , info) => {
            if (error) {
                return next (error)
            }
            if (!user) {
                return res.status(401).send ({error: info.message ? info.message : info.toString()})
            }

            req.user = user
            next()
        }) (req,res, next) // Esto es por que me va a llamar un middleware
    }
}

// Recido un rol y establezco la capacidad del usuario

export const authorization = (rol) => {
return async (req, res, next) => {
    if(!req.user) {
        return res.status(401).send ({error: 'User no autorizado'})
    }
    if(req.user.user.rol !=rol) {
        return res.status(401).send({error: 'Usuario no tiene los permisos necesarios'})
    }
    next ()
}
} 