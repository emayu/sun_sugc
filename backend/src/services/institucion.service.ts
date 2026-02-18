import { InstitucionRepository } from "../repositories/institucion.repository";

export class InstitucionService {
    static getAllInstituciones(){
        return InstitucionRepository.findAll();
    }
    static getInstitucionesByResponsable(id_responsable: number){
        return InstitucionRepository.findByResponsable(id_responsable)
    }
    static getInstitucionById(id:number){
        return InstitucionRepository.findById(id);
    }
}