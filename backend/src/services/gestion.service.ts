import { BitacoraRepository } from "../repositories/bitacora.repository";
import { RestultadoGestionRepository } from "../repositories/resultadoGestion.respository";


export class GestionService{
    static getHistorial(id_institucion: number){
        return BitacoraRepository.findByInstitucion(id_institucion);
    }

    static getAllResultadosGestion(){
        return RestultadoGestionRepository.getAll();
    }
}