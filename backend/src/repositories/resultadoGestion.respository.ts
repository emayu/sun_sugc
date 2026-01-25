import { ResultadoGestion } from "../models";

export class RestultadoGestionRepository {
    static async getAll(){
        return ResultadoGestion.findAll();
    }
}