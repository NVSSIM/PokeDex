import { DataTypes, Model} from "sequelize";
import Database from "./database.js";
import bcrypt from "bcrypt";

class Dresseur extends  Model {}

Dresseur.init({
    id:{
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement:true,
    },
    nom:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    prenom:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    login:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    age:{
        type:DataTypes.INTEGER(),
        allowNull: false
    },
    scope:{
        type: DataTypes.STRING(10),
        allowNull: false,
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
    sequelize:Database,
    modelName: 'Dresseur',
    timestamps:false,
})



export default Dresseur