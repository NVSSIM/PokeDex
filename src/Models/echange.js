import {DataTypes, INTEGER, Model, Sequelize} from "sequelize";
import Database from "./database.js";
import Pokemon from "./pokemon.js";
import Dresseur from "./dresseur.js";

class Echange extends  Model {}


Echange.init({

    id:{
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement:true,
    },
    proposition:{
        type: DataTypes.ARRAY(INTEGER), //zzzzzz
        allowNull:false,
    },
    validation:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            isIn:[['encours','favorable','defavorable']]
        },
    },


},{
    sequelize:Database,
    modelName: 'Echange',
    timestamps:false,
})

Echange.hasMany(Dresseur);
Echange.hasOne(Pokemon);
await Echange.sync({alter:true})


export default Echange
