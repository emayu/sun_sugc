import path from "node:path";
import { sequelize } from "../../config/database";
import { BitacoraCreationModel } from "../../models/bitacora.model";
import { ESTADO_INSTITUCION } from "../../models/estadoInstitucion.model";
import { InstitucionModel } from "../../models/institucion.model";
import { BitacoraRepository } from "../../repositories/bitacora.repository";
import { InstitucionRepository } from "../../repositories/institucion.repository";
import { UsuarioRepository } from "../../repositories/usuario.repository";
import { EmailProvider } from "./email.provider";
import { NodemailerProvider } from "./nodemailer.provider";

export class MailerService {
    
    constructor(private provider: EmailProvider = new NodemailerProvider()){
    }

    async enviarInvitacion(idInstitucion: number, userId: number, destinatarios: string[]) {

        const institucion = await InstitucionRepository.findById(idInstitucion);
        if (!institucion) {
            throw Error('NOT FOUND ' + idInstitucion);
        }
        const user = await UsuarioRepository.findById(userId);
        const perms = user?.roles.split(',');
        if (!perms?.includes('admin') && institucion.id_responsable !== userId) {
            throw Error("FORBIDDEN");
        }

        const now = new Date();
        const htmlTemplate = `
                    <div style="style="font-family: Arial, sans-serif; color: #333;">
                        <p>
                            Estimados Directores de Establecimientos de Educación Media del Ministerio de Educación:
                        </p><br>
                        <p>
                            Reciban un cordial saludo de parte de la Universidad de San Carlos de Guatemala, por este medio nos permitimos
                            hacer de su conocimiento que en el presente año se llevará a cabo la Semana Informativa INFOUSAC 2026,
                            en las fechas del 17 al 20 de marzo del año en curso, en la Ciudad Universitaria Zona 12.
                        </p>
                        <p>
                            Por lo anterior se <b>adjunta Oficio de invitación</b>, con los detalles oficiales del evento.
                            Les solicitamos cordialmente revisar dicho documento para proceder con su registro
                        </p>

                        <div style="margin: 25px 0;">
                            <a href="https://forms.gle/tVFwunc5mcrPY7Jn9" 
                                target="_blank" 
                                style="background-color: #1a73e8; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                Formulario de participación Aquí
                            </a>
                        </div>
                        
                        <p>
                            Agradeciendo la atención a la presente, nos suscribimos de ustedes
                        </p>
                        <p>
                            Atentamente,
                        </p>
                        <table style="border-top: 1px solid #ccc; padding-top: 10px; width: 100%;">
                            <tr>
                                <td style="width: 100px; height: 100px;">
                                    <img src="cid:logo_footer" width="146" height="117" />
                                </td>
                                <td style="font-size: 12px; color: #777;">
                                    <strong>${process.env.CONTACT_MANAGER_NAME}</strong><br>
                                    Comisión de Convocatoria<br>
                                    Cel: ${process.env.CONTACT_MANAGER_PHONE} <br>
                                    <br>
                                    <div style="color: #ffffff; font-size: 1px; line-height: 1px; margin-top: 5px;">
                                         REF: #${idInstitucion}-inst-${userId}-${now.getTime().toString(36)}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
        `;
        const subject = 'Invitación para participar en INFOUSAC 2026';
        const result = await this.provider.send({
            to: destinatarios.join(','),
            subject,
            html: htmlTemplate,
            attachments: [
                    {
                        filename: 'Oficio invitación Ref. INFOUSAC_C_01-2026.pdf',
                        path: path.join(__dirname, '../../../assets/docs/invitacion.pdf'),
                        contentType: 'application/pdf'
                    },
                    {
                        filename: 'logo.png',
                        path: path.join(__dirname, '../../../assets/img/logo_footer_email.png'),
                        cid: 'logo_footer'
                    }
                ]
        });

        if (result.success) {
            const transaction = await sequelize.transaction();
            try {
                const newRegistro = await BitacoraRepository.create({
                    id_institucion: idInstitucion,
                    id_usuario: userId,
                    accion: 'ENVÍO EMAIL',
                    medio_contacto: 'EMAIL',
                    fecha_gestion_inicio: now,
                    fecha_gestion_final: now,
                    id_resultado: 10,
                    observaciones: `Envío de correo invitación desde <${process.env.EMAIL_ACCOUNT}> asunto "${subject}" hacia ${destinatarios.join(', ')}`
                }, transaction);
                await InstitucionRepository.update(idInstitucion, {
                    id_estado_institucion: ESTADO_INSTITUCION.INVITACION_ENVIADA,
                    ultima_gestion_at: now
                }, transaction);
                await transaction.commit();
                const updatedInstitucion = await InstitucionRepository.findById(institucion.id);
                return {
                    gestion: newRegistro,
                    institucion: updatedInstitucion,
                }
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        }else{
            throw result.error;
        }

    }

}
