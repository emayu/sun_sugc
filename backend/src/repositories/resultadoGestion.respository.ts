import { ResultadoGestion } from "../models";

export class RestultadoGestionRepository {
    static async getAll(){
        return ResultadoGestion.findAll();
    }

    static async findById(id:number){
        return ResultadoGestion.findByPk(id);
    }
}