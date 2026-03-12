import { ConfirmacionType } from "../models/registroAsistencia.model";


export interface ConfirmacionAsistenciaDTO {
  id: number;
  nombre_establecimiento: string;
  direccion: string | null;
  departamento: string;
  municipio: string;
  estado_participacion: ConfirmacionType;
  fecha_participacion: string | null;
  fecha_text: string | null;
  hora_participacion: string | null;
  cantidad_graduandos: number | null; 
  tiene_responsable: string | null;
  nombre_responsable: string | null;
  tel_responsable: string | null;
  observaciones: string | null;
}