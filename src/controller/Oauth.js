import express from "express";
import jwt from "jsonwebtoken";
import Dresseur from '../Models/dresseur.js'
import bcrypt from "bcrypt";

const OauthRouter = express.Router();
const acceptedScopes = ['USER','ADMIN']
const authorizationCode = "OAUTH_TEST_APP_ACCEPTED"
const acceptedClientId = "OAUTH_TEST_APP"
const acceptedClientSecret = "OAUTH_TEST_APP_SECRET"

OauthRouter.get("/authorize",async (req, res)=>{
    const queryParams = req.query

    if(queryParams.client_id !== acceptedClientId ){
        return res.status(400).send({error: "Application is not authorized"})
    }
    if(!queryParams.redirect_uri){
        return res.status(400).send({error: "Application is not authorized"})
    }
    if(!acceptedScopes.includes(queryParams.scopes)){
        return res.status(400).send('No users scopes provided')
    }
    return res.status(200).send({authorizationCode})
});

OauthRouter.post("/token",async(req, res)=>{
    const queryParams = req.query
    const {login,password,scopes} = req.body

    if(queryParams.client_id !== acceptedClientId || queryParams.client_secret!== acceptedClientSecret){
        return res.status(401).send({error:'Application is not authorized'})
    }
    if (!queryParams.code){
        return res.status(400).send({error:'No authorization code provided'})
    }
    const dresseur = await Dresseur.findOne({
        where:{
            login,
        }
    })

    if(!dresseur){
        return res.status(404).send({error:"Dresseur not found"})
    }
    if(!bcrypt.compareSync(password,dresseur.password)){
        return res.status(401).send({error:"login or password is wrong"})
    }
    const accessToken = jwt.sign(
        {id: dresseur.id,scopes},
        "ServerInternalPrivateKey",
        {expiresIn:'30m'},
        {}
    )
    return res.status(200).send({accessToken, tokenType:'Bearer',expiresIn:'30m'})
});

export default OauthRouter;