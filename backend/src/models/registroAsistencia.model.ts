import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export type RegistroType = "GRUPO_OFICIAL" | "INDIVIDUAL";
export type ConfirmacionType = "CONFIRMADO" | "DECLINADO" | "SIN_REGISTRO";

export interface RegistroAsistenciaModel {
    id: number;
    id_institucion: number | null;
    tipo_registro: RegistroType;
    tipo_confirmacion: ConfirmacionType;
    nombre_institucion: string;
    cantidad_estudiantes: number;
    nombre_encargado: string | null;
    tel_encargado: string | null;
    correo_encargado: string | null;
    correo_principal_institucion: string | null;
    tel_principal_institucion: string | null;
    observaciones: string | null;
    fecha_registro: Date;
    id_usuario_registro: number;
}


export interface RegistroAsistenciaCreationModel extends Optional<RegistroAsistenciaModel, 'id'|'fecha_registro'>{}

export class RegistroAsistencia extends Model<RegistroAsistenciaModel, RegistroAsistenciaCreationModel> implements RegistroAsistenciaModel {
    id!: number;
    id_institucion!: number | null;
    tipo_registro!: RegistroType;
    tipo_confirmacion!: ConfirmacionType;
    nombre_institucion!: string;
    cantidad_estudiantes!: number;
    nombre_encargado!: string | null;
    tel_encargado!: string | null;
    correo_encargado!: string | null;
    correo_principal_institucion!: string | null;
    tel_principal_institucion!: string | null;
    observaciones!: string | null;
    fecha_registro!: Date;
    id_usuario_registro!: number;
}

RegistroAsistencia.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_institucion: { type: DataTypes.INTEGER, allowNull: true },
    tipo_registro: { type: DataTypes.STRING(20), allowNull: false },
    tipo_confirmacion: { type: DataTypes.STRING(20), allowNull: false },
    nombre_institucion: { type: DataTypes.STRING(200), allowNull: false },
    cantidad_estudiantes: { type: DataTypes.INTEGER, allowNull: false },
    nombre_encargado: { type: DataTypes.STRING },
    tel_encargado: { type: DataTypes.STRING },
    correo_encargado: { type: DataTypes.STRING },
    correo_principal_institucion: { type: DataTypes.STRING },
    tel_principal_institucion: { type: DataTypes.STRING },
    observaciones: { type: DataTypes.STRING },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    id_usuario_registro: { type: DataTypes.INTEGER },
},{
    sequelize,
    tableName: 'registro_asistencia',
    timestamps: false,
});