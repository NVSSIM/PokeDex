import express from "express";
import bcrypt from "bcrypt";
import Dresseur from "../Models/dresseur.js";
import Pokemon from "../Models/pokemon.js";
import checkAuthorization from "../middleware/Oauth_.js";
import isUserAdmin from "../middleware/Oauth_.js";

const dresseurRouter = express.Router();
dresseurRouter.post("/create", async (req,res) => {
    const {
        prenom,
        nom,
        age,
        login,
        password,
    } = req.body
    try{
        const encryptedPassword = bcrypt.hashSync(password,5);

        const {id} = await Dresseur.create({
            prenom,
            nom,
            age,
            login,
            password: encryptedPassword,
            scope:'USER',
            created_at:new Date(),
            updated_at:new Date(),
        })
        return res.status(201).json({id});
    } catch(e){
        return res.status(500).send(e.message)
    }
});

dresseurRouter.use(checkAuthorization)
dresseurRouter.get("/info/:id",async (req,res) => {
    const {id} = req.params
    const noPokemon = "le dresseur n'a pas de pokémons"

    try {
        const dresseur = await Dresseur.findByPk(id)
        const pokemon = await Pokemon.findAll({where:{DresseurId:id}});
        const dresseurPokedex = {dresseur,pokemon}
        if(dresseur == null){
            return res.status(404).send("pas de dresseurs correspondants à l'id")
        }
        if(pokemon.length == null){
            return res.status(200).send(dresseur + noPokemon)
        }

        return res.status(200).send(dresseurPokedex)
    } catch (e) {
        return res.status(500).send(e.message)
    }
});

dresseurRouter.use(isUserAdmin)
dresseurRouter.patch("/update/prenom/:id",async (req,res) => {
    const {id} = req.params
    const {prenom} = req.body
    const updated_at = new Date()

    try{
        const dresseur = await Dresseur.findByPk(id)
        if(!dresseur){
            return res.status(404).send("pas de dresseur correspondant à l'id")
        }
        const dresseur2update = {...dresseur,...{prenom,updated_at}}
        const dresseurUpdated = await dresseur.update(dresseur2update)

        return res.status(200).send(dresseurUpdated)
    } catch (e){
        return  res.status(500).send(e)
    }
});

dresseurRouter.patch("/update/nom/:id",async (req,res) => {
    const {id} = req.params
    const {nom} = req.body
    const updated_at = new Date()

    try{
        const dresseur = await Dresseur.findByPk(id)
        if(!dresseur){
            return res.status(404).send("pas de dresseur correspondant à l'id")
        }
        const dresseur2update = {...dresseur,...{nom,updated_at}}
        const dresseurUpdated = await dresseur.update(dresseur2update)

        return res.status(200).send(dresseurUpdated)
    } catch (e){
        return  res.status(500).send(e)
    }
});

dresseurRouter.delete("/delete/:id",async (req,res) => {
    const {id} = req.params
    try {
        const dresseur = Dresseur.destroy({where:{id}})
        if(dresseur == null){
            return res.status(404).send("pas de dresseurs correspondants à l'id pour la suppression")
        }
        return res.status(200).send(dresseur)
    } catch (e) {
        return res.status(500).send(e.message)
    }
});

export default dresseurRouter;