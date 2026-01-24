import {Usuario} from "../models/usuario.model";

export class UsuarioRepository{
    static async findByEmail(email:string){
        const usuario = await Usuario.findOne({where: {email}});
        return usuario;
    }
}