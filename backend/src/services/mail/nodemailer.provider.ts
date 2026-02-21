import { EmailProvider, EmailOptions } from "./email.provider";
import nodemailer from 'nodemailer';


export class NodemailerProvider implements EmailProvider {
    private transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ACCOUNT,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    
    async send(email: EmailOptions): Promise<{ success: boolean; error?: any; messageId?: any; }> {
        try {
            const info = await this.transporter.sendMail({
                from: `"${process.env.EMAIL_DISPLAY_NAME}" <${process.env.EMAIL_ACCOUNT}>`,
                to: email.to,
                subject: email.subject,
                html: email.html,
                attachments: email.attachments
            });

            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error("Error enviando email:", error);
            return { success: false, error };

        }

    }


}