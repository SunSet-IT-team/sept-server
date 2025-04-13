import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `"Септик" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};
