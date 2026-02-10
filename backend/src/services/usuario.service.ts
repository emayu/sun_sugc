import bcrypt from "bcrypt";
import { Usuario } from "../models";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { UsuarioCreationModel, UsuarioModel } from "../models/usuario.model";
export class UsuarioService {
    private static readonly  SALT_ROUNDS = 11;

    static async actualizarPassword(id:number, newPassword:string){
        if(!(await UsuarioRepository.findById(id))){
            throw new Error(`El usuario [${id}] no fue encontrado`)
        }

        const hashPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
        const updateInfo:Partial<UsuarioModel> = {
            password_hash : hashPassword
        };
        return UsuarioRepository.update(id, updateInfo);
    }

    static async createUser(newUser:UsuarioCreationModel){
        newUser.password_hash = await bcrypt.hash(newUser.contrasena, this.SALT_ROUNDS);
        return UsuarioRepository.create(newUser);
    }
}