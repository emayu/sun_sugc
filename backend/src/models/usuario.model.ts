import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface UsuarioModel {
    id: number;
    nombre: string;
    email: string;
    password_hash: string;
    roles: string;
}


export interface UsuarioCreationModel extends Optional<UsuarioModel, 'id'> {}

export class Usuario extends Model<UsuarioModel, UsuarioCreationModel> implements UsuarioModel{
    id!: number;
    nombre!: string;
    email!: string;
    password_hash!: string;
    roles!: string;
    
}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    roles: {
        type: DataTypes.STRING,
        defaultValue: 'usuario'
    },
    
}, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    underscored: true
});