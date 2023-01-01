import Dresseur from "../Models/dresseur.js";


const isUserAdmin = async (req,res,next) =>{
    const dresseur = await Dresseur.findByPk(res.locals.requestor.id)
    if(!dresseur){
        return res.status(404).send('Dresseur not found')
    }

    if(dresseur.scope!=='ADMIN'){
        return res.status(403).send({error:"You don't have the privilege to do this action"})
    }
    next()
}

export default isUserAdmin;