import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface InstitucionModel {
    id: number;
	codigo_mineduc: string;
	distrito: string;
	departamento: string;
	municipio: string;
	nombre_establecimiento : string;
	direccion: string;
	sector: string;
	nivel: string;
	jornada: string;
	plan: string;
	cantidad_graduandos: number;
	supervisor : string;
	director: string;
	contacto_alterno : string;
	id_estado_institucion: number;
	id_responsable: number;
	ultima_gestion_at: Date;
	estado_mineduc: string;
	tel_1: string;
	estado_tel_1: string;
	tel_2: string;
	estado_tel_2: string;
	email_1: string;
	estado_email_1: string;
	email_2: string;
	estado_email_2: string;
	tel_nuevo_1: string;
	estado_tel_nuevo_1: string;
	tel_nuevo_2: string;
	estado_tel_nuevo_2: string;
	tel_nuevo_3: string;
	estado_tel_nuevo_3: string;
}

interface InstitucionCreationModel extends Optional<InstitucionModel, 'id'>{}

export class Institucion extends Model<InstitucionModel, InstitucionCreationModel> implements InstitucionModel{
    id!: number;
    codigo_mineduc!: string;
    distrito!: string;
    departamento!: string;
    municipio!: string;
    nombre_establecimiento!: string;
    direccion!: string;
    sector!: string;
    nivel!: string;
    jornada!: string;
    plan!: string;
    cantidad_graduandos!: number;
    supervisor!: string;
    director!: string;
    contacto_alterno!: string;
    id_estado_institucion!: number;
    id_responsable!: number;
    ultima_gestion_at!: Date;
    estado_mineduc!: string;
    tel_1!: string;
    estado_tel_1!: string;
    tel_2!: string;
    estado_tel_2!: string;
    email_1!: string;
    estado_email_1!: string;
    email_2!: string;
    estado_email_2!: string;
    tel_nuevo_1!: string;
    estado_tel_nuevo_1!: string;
    tel_nuevo_2!: string;
    estado_tel_nuevo_2!: string;
    tel_nuevo_3!: string;
    estado_tel_nuevo_3!: string;

}

Institucion.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
	codigo_mineduc: {type: DataTypes.STRING},
	distrito: {type: DataTypes.STRING},
	departamento: {type: DataTypes.STRING},
	municipio: {type: DataTypes.STRING},
	nombre_establecimiento: {type: DataTypes.STRING},
	direccion: {type: DataTypes.STRING},
	sector: {type: DataTypes.STRING},
	nivel: {type: DataTypes.STRING},
	jornada: {type: DataTypes.STRING},
	plan: {type: DataTypes.STRING},
	cantidad_graduandos: {type: DataTypes.INTEGER},
	supervisor: {type: DataTypes.STRING},
	director: {type: DataTypes.STRING},
	contacto_alterno: {type: DataTypes.STRING},
	id_estado_institucion:{type: DataTypes.INTEGER},
	id_responsable:{type: DataTypes.INTEGER},
	ultima_gestion_at: {type: DataTypes.DATE },
	estado_mineduc: {type: DataTypes.STRING},
	tel_1: {type: DataTypes.STRING},
	estado_tel_1: {type: DataTypes.STRING},
	tel_2: {type: DataTypes.STRING},
	estado_tel_2: {type: DataTypes.STRING},
	email_1: {type: DataTypes.STRING},
	estado_email_1: {type: DataTypes.STRING},
	email_2: {type: DataTypes.STRING},
	estado_email_2: {type: DataTypes.STRING},
	tel_nuevo_1: {type: DataTypes.STRING},
	estado_tel_nuevo_1: {type: DataTypes.STRING},
	tel_nuevo_2: {type: DataTypes.STRING},
	estado_tel_nuevo_2: {type: DataTypes.STRING},
	tel_nuevo_3: {type: DataTypes.STRING},
	estado_tel_nuevo_3: {type: DataTypes.STRING},
},{
    sequelize,
    tableName: 'instituciones',
    timestamps: false,
});