import { ConfirmacionType } from "../models/registroAsistencia.model";


export interface ConfirmacionAsistenciaDTO {
  id: number;
  nombre_establecimiento: string;
  direccion: string | null;
  departamento: string;
  municipio: string;
  tipo_confirmacion: ConfirmacionType;
  fecha_participacion: string | null;
  hora_participacion: string | null;
  nombre_responsable: string | null;
  tel_responsable: string | null;
  observaciones: string | null;
}