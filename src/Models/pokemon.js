import {DataTypes, Model } from "sequelize";
import Database from "./database.js";
import Dresseur from "./dresseur.js";
import bcrypt from "bcrypt";

class Pokemon extends  Model {}

Pokemon.init({
    espece:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    id:{
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement:true,
    },
    nom:{
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    genre:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            isIn:[['male','femelle','non defini']],          //je dit merci à Louis Morando pour le trick
        },
    },
    niveau:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    taille:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    poids: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    chromatic:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull:false,
    },

},{
    sequelize: Database,
    modelName: 'Pokemon',
    timestamps:false,
})

Dresseur.hasMany(Pokemon);
Pokemon.belongsTo(Dresseur);



export default Pokemon
