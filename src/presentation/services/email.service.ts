
import nodemailer, { Transporter } from 'nodemailer';
import { envs } from '../../config';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter: Transporter;

    constructor(
        mailerService: string = envs.MAILER_SERVICE,
        mailerEmailId: string = envs.MAILER_EMAIL_ID,
        mailerSecretKey: string = envs.MAILER_SECRET_KEY
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmailId,
                pass: mailerSecretKey,
            }
        });
    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail(
                {
                    to: to,
                    subject: subject,
                    html: htmlBody,
                    attachments: attachments
                }
            )
            console.log({ sentInformation })
            return true;
        } catch (error) {
            return false;
        }
    }

}