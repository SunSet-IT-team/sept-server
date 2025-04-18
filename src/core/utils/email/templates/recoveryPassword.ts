import {baseTemplate} from './baseTemplate';

export const recoveryPassword = (code: string) =>
    baseTemplate(
        'Восстановление пароля',
        `<p>Ваш для восстановления: <strong>${code}</strong></p>
     <p>Срок действия кода: 15 минут</p>`
    );
