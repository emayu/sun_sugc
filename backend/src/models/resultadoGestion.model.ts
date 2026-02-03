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
});


export const RESULTADO_GESTION = {
    CONTACTO_EXITOSO: 1,
    NO_CONTESTAN: 2,
    LINEA_DANADA: 3,
    NUMERO_EQUIVOCADO: 4,
    FUERA_DE_SERVICIO: 5,
    PIDIO_RELLAMAR: 6,
    BUZON_DE_VOZ: 7,
    DATO_ENCONTRADO: 8,
    DATOS_NO_ENCONTRADOS: 9,
    CORREO_ENVIADO: 10,
}

export type ResultadoGestionEstado = typeof RESULTADO_GESTION[keyof typeof RESULTADO_GESTION];