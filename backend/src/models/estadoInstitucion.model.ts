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
});


export const ESTADO_INSTITUCION = {
    PENDIENTE: 1,
    EN_PROCESO: 2,
    SEGUIMIENTO_PENDIENTE: 3,
    LLAMADA_PROGRAMADA: 4,
    INVESTIGACION: 5,
    INVITACION_ENVIADA: 6,
    CONFIRMADO: 7,
    DECLINADO: 8,
    CONTACTADO: 9,
}

export type InstitucionEstado = typeof ESTADO_INSTITUCION[keyof typeof ESTADO_INSTITUCION];