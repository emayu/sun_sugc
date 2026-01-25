import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface BitacoraModel {
    id: number;
    id_institucion: number;
    id_usuario: number;
    fecha_gestion_inicio: Date;
    fecha_gestion_final: Date;
    accion: string, 
    medio_contacto: string;
    id_resultado: string;
    observaciones: string;
    proxima_llamada: Date;
}

export interface BitacoraCreationModel extends Optional<BitacoraModel, 'id'>{}


export class Bitacora extends Model<BitacoraModel, BitacoraCreationModel> implements BitacoraModel{
    id!: number;
    id_institucion!: number;
    id_usuario!: number;
    fecha_gestion_inicio!: Date;
    fecha_gestion_final!: Date;
    accion!: string;
    medio_contacto!: string;
    id_resultado!: string;
    observaciones!: string;
    proxima_llamada!: Date;
}

Bitacora.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_institucion: { type: DataTypes.INTEGER, allowNull: false },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    fecha_gestion_inicio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_gestion_final: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    accion: { type: DataTypes.STRING(50) }, // "Llamada T1", "WhatsApp", etc.
    medio_contacto: { type: DataTypes.STRING(50) }, // El número específico al que se llamó
    id_resultado: { type: DataTypes.STRING(100) }, // "Contacto exitoso", "No contestó"
    observaciones: { type: DataTypes.TEXT },
    proxima_llamada: { type: DataTypes.DATE } 
}, {
    sequelize,
    tableName: 'bitacora_gestiones',
    timestamps: false,
    underscored: true
});