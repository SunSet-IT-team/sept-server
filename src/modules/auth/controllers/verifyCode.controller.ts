import {Request, Response} from 'express';
import {verifyCode, VerifyCodeResult} from '../services/verifyCode.service';

interface VerificationRequest {
    email: string;
    code: string;
}

export async function verification(
    req: Request<{}, {}, VerificationRequest>,
    res: Response
): Promise<any> {
    try {
        const {email, code} = req.body;

        // Валидация входных данных
        if (!email || !code) {
            res.status(400).json({
                success: false,
                error: 'Email и код подтверждения обязательны',
            });
        }

        const result = await verifyCode(email, code);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'Email успешно подтвержден',
            });
        } else {
            res.status(400).json({
                success: false,
                error: result.error || 'Неверный код подтверждения',
            });
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({
            success: false,
            error: 'Произошла ошибка при подтверждении email',
        });
    }
}
