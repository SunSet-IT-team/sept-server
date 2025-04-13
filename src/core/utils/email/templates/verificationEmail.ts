import {baseTemplate} from './baseTemplate';

export const verificationEmail = (code: string) =>
    baseTemplate(
        'Подтверждение почты',
        `<p>Ваш код подтверждения: <strong>${code}</strong></p>
     <p>Срок действия кода: 15 минут</p>`
    );
