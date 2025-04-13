import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, code: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Подтверждение email',
        html: `<p>Ваш код подтверждения: <strong>${code}</strong>.</p>`,
    };

    await transporter.sendMail(mailOptions);
};
