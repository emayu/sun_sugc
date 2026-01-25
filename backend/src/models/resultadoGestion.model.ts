import { DataTypes, Model } from "sequelize";

import { sequelize } from "../config/database";

export interface ResultadoGestionModel{
    id: number;
    nombre: string;
    tipo: string;
    descripcion?: string;
}



export class ResultadoGestion extends Model<ResultadoGestionModel> implements ResultadoGestionModel{
    id!: number;
    nombre!: string;
    tipo!:string;
    descripcion!: string;
    
}


ResultadoGestion.init({
    id: { type: DataTypes.NUMBER, primaryKey:true },
    tipo: { type: DataTypes.STRING},
    nombre: { type: DataTypes.STRING},
    descripcion: { type: DataTypes.STRING}
}, {
 sequelize,
 tableName: 'cat_resultados_gestion',
    timestamps: false,
    underscored: true
})