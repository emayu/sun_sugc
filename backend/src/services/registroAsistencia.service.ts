import { RegistroAsistenciaCreationModel, RegistroAsistenciaModel } from "../models/registroAsistencia.model";
import { RegistroAsistenciasRepository } from "../repositories/registroAsitencia.repository";



export class RegistroAsistenciaService{
    static getAll(){
        return RegistroAsistenciasRepository.findAll();
    }

    static createRegistroAsistencia(newRegistro:RegistroAsistenciaCreationModel){
        return RegistroAsistenciasRepository.create(newRegistro);
    }

    static updateRegistroAsistencia(id:number, updateData:Partial<RegistroAsistenciaModel>){
        return RegistroAsistenciasRepository.update(id, updateData);
    }
}