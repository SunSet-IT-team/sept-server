// src/services/emailService.ts
import nodemailer from 'nodemailer';

// Конфигурация транспорта (для Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

/**
 * Отправляет письмо с кодом подтверждения
 */
export async function sendVerificationEmail(to: string, code: string) {
    const mailOptions = {
        from: `"Your App" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Подтверждение регистрации',
        text: `Ваш код подтверждения: ${code}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Подтверждение регистрации</h2>
                <p>Ваш код подтверждения:</p>
                <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">${code}</p>
                <p>Код действителен в течение 15 минут.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${to}`);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Не удалось отправить письмо с подтверждением');
    }
}

export async function sendRecoveryCode(to: string, code: string) {
    const mailOptions = {
        from: `"СЕПТИК" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Ваш код для восстановления доступа',
        text: `Ваш код подтверждения: ${code}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Вы изменили пароль!</h2>
                <h3 style="color: #000;">Для следующего изменения пароля используйте этот код!</h3>
                <p>Ваш код подтверждения:</p>
                <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">${code}</p>
                <p>Если вы потеряете код, то не сможете восстановить доступ к своему аккаунту никогда!</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}
