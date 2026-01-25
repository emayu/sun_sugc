import bcrypt from "bcrypt";

import { UsuarioModel } from "../models/usuario.model"
import { UsuarioRepository } from "../repositories/usuario.repository"
import { issueToken } from "../security/security";

export class AuthService {
    static async login(email:string, password:string){
        const user = await UsuarioRepository.findByEmail(email);

        if(!user){
            throw Error("Credenciales invalidas")
        }
        const ok = bcrypt.compare(password, user.password_hash);

        if(!ok){
            throw Error("Credenciales invalidas")
        }
        const roles = user.roles.split(',');

        const token = issueToken({id:user.id, email: user.email, roles: roles})

        return {
            token,
            usuario:user
        }
    }

}