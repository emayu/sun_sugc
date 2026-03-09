import { ConfirmadosRepository } from "../repositories/confirmados.repository";



export class ConfirmacionService{
    static getAllInstituciones(){
        return ConfirmadosRepository.findAll();
    }
    
}