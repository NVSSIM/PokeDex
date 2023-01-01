import express from "express";
import Pokemon from "../Models/pokemon.js";
import Dresseur from "../Models/dresseur.js"
import bcrypt from "bcrypt";
import dresseurRouter from "./dresseur.js";

const pokemonRouter = express.Router();

pokemonRouter.post("/create/:dresseurId", async (req,res) => {
    const {dresseurId} = req.params
    const {
        espece,
        nom,
        genre,
        niveau,
        taille,
        poids,
        chromatic,
    } = req.body
    try{
        const {id} = await Pokemon.create({
            espece,
            nom,
            genre,
            niveau,
            taille,
            poids,
            chromatic,
            DresseurId:dresseurId,
            created_at:new Date(),
            updated_at:new Date(),
        })
        return res.status(201).json({id});
    } catch(e){
        return res.status(500).send(e.message)
    }
});

pokemonRouter.patch("/management/nom/:id",async (req,res) => {
    const {id} = req.params
    const {nom} = req.body
    const updated_at = new Date()
    try{
        const pokemon = await Pokemon.findByPk(id)
        if(!pokemon){
            return res.status(404).send("pas de pokemon correspondants à l'id")
        }
        const pokemon2update = {...pokemon,...{nom,updated_at}}
        const pokemonUpdated = await pokemon.update(pokemon2update)

        return res.status(200).send(pokemonUpdated)
    } catch (e){
        return  res.status(500).send(e)
    }
});

pokemonRouter.patch("/management/niveau/:id",async (req,res) => {
    const {id} = req.params
    const {niveau} = req.body
    const updated_at = new Date()

    try{
        const pokemon = await Pokemon.findByPk(id)
        if(!pokemon){
            return res.status(404).send("pas de pokemon correspondants à l'id")
        }
        const pokemon2update = {...pokemon,...{niveau,updated_at}}
        const pokemonUpdated = await pokemon.update(pokemon2update)

        return res.status(200).send(pokemonUpdated)
    } catch (e){
        return  res.status(500).send(e)
    }
});

pokemonRouter.get("/info/:id",async (req,res) => {
    const {id} = req.params
    try{
        const pokemon = await Pokemon.findByPk(id)
        if(!pokemon){
            return res.status(404).send("pas de pokémon correspondants à l'id")
        }
        return res.status(200).send(pokemon)
    } catch(e){
        return res.status(500).send(e.message)
    }
});

pokemonRouter.delete("/delete/:id",async (req,res) => {
    const {id} = req.params
    try {
        const pokemon = Pokemon.destroy({where:{id}})
        if(pokemon == null){
            return res.status(404).send("pas de pokemons correspondants à l'id pour la suppression")
        }
        return res.status(200).send(pokemon)
    } catch (e) {
        return res.status(500).send(e.message)
    }
});

export default pokemonRouter