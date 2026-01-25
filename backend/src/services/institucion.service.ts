import { InstitucionRepository } from "../repositories/institucion.repository";

export class InstitucionService {
    static getInsitucionesByResponsable(id_responsable: number){
        return InstitucionRepository.findByResponsable(id_responsable)
    }
}