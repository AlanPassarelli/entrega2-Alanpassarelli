
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {

    /*
    1° parametro: Objeto asociado al tojen (usuario)
    2° parametro: Clave privada para el cifrado
    3° parametro: Tiempo de expiracion
    */
    const token = jwt.sign ({user}, "alanCoder", {expiresIn: '12h'})

    console.log(token)

    return token
}

// generateToken({"_id":"650a6693a2bd1d6f10f9bdb7","first_name":"jose","last_name":"pepe","age":"25","email":"jose@pepe.com","password":"1234","rol":"user"}) 

export const authToken = (req,res, next) => {
    //Consultar al header para obtener el token

    const authHeader = req.headers.Authorization

    if (!authHeader) {
        return res.status(401).send({error: 'Usuario no autenticado'})
    }

    const token = authHeader.split(' ')[1] //Obtengo el token y descarto Bearer

    jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
        if (error) {
            return res.status (403).send ({error: 'Usuario no autorizado, token invalido'})
        }
    })

    //Usuario valido

    req.user = credential.user
    next ()
}