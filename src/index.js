import express from "express"
import dresseurRouter from "./controller/dresseur.js";
import pokemonRouter from "./controller/pokemon.js";
import swaggerUi from "swagger-ui-express";
import OauthRouter from "./controller/Oauth.js";
import Pokemon from "./Models/pokemon.js"; // si je n'importe pas le modele la table ne se crée pas
import Echange from "./Models/echange.js";
import Dresseur from "./Models/dresseur.js";
import swaggerDescription from './swagger.json' assert { type: 'json'}
import init from "./dataSeeder.js";
const port = 80
const app = express()

await init()

app.use(express.json())
app.use("/Oauth",OauthRouter);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDescription));

app.use("/dresseur", dresseurRouter);
app.use("/pokemon",pokemonRouter);

const listener = app.listen(port, () =>{
    console.log('Listening on port ' + port)
})

export default listener

