import { EstadoInstitucion } from "../models";

export class RestultadoGestionRepository {
    static async getAll(){
        return EstadoInstitucion.findAll();
    }
}