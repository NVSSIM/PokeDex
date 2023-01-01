import Dresseur from "./Models/dresseur.js";
import bcrypt from "bcrypt";
import Pokemon from "./Models/pokemon.js";

const init = async () => {
    try {
        await Dresseur.sync({alter:true})
        await Pokemon.sync({alter:true})
        const encryptedPassword = bcrypt.hashSync('syntia',5);
        const test = await Dresseur.findAll();
        if (test.length === 0){
            await Dresseur.create({
                        nom:"Léo",
                        prenom:"Pokemaniac",
                        login:"leopkmn",
                        password:encryptedPassword,
                        age:"23",
                        scope:"ADMIN",
                        created_at:new Date(),
                        updated_at:new Date()
                    })
        }
        // const test2 = await Dresseur.findOrCreate({
        //     where:{
        //         login:"leopkmn"
        //     },
        //     default:{
        //         nom:"Léo",
        //         prenom:"Pokemaniac",
        //         login:"leopkmn",
        //         password:encryptedPassword,
        //         age:"23",
        //         scope:"ADMIN",
        //         created_at:new Date(),
        //         updated_at:new Date()
        //     }
        // })
    } catch (e) {

    }
 }

 export default init