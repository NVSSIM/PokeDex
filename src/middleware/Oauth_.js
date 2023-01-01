import jwt from "jsonwebtoken";

const checkAuthorization = async (req,res,next)=>{
    const authorization = req.headers['authorization']

    if(!authorization){
        return res.status(401).send({error: 'You are not Connected'})
    }
    const bearerToken = authorization.split(' ')
    if(bearerToken.length !==2 || bearerToken[0] !== 'Bearer'){
        return res.status(401).send({error: 'Invalid token type'})
    }
    try {
        res.locals.requestor = await jwt.verify(bearerToken[1],'ServerInternalPrivateKey')

    } catch (e) {
        if (e instanceof jwt.TokenExpiredError){
            return res.redirect('/')
        }
        return res.status(500).send(err)
    }
    next()
}

export default checkAuthorization;