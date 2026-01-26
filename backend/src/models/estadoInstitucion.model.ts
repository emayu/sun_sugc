import { DataTypes, Model } from "sequelize";

import { sequelize } from "../config/database";

export interface EstadoInstitucionModel{
    id: number;
    nombre: string;
    descripcion?: string;
}



export class EstadoInstitucion extends Model<EstadoInstitucionModel> implements EstadoInstitucionModel{
    id!: number;
    nombre!: string;
    descripcion!: string;
}


EstadoInstitucion.init({
    id: { type: DataTypes.NUMBER, primaryKey:true },
    nombre: { type: DataTypes.STRING},
    descripcion: { type: DataTypes.STRING}
}, {
 sequelize,
 tableName: 'cat_estados_institucion',
    timestamps: false,
    underscored: true
})