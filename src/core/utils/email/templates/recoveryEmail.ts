import {baseTemplate} from './baseTemplate';

export const recoveryEmail = (code: string) =>
    baseTemplate(
        'Код восстановления администратора',
        `<p>Ваш новый код восстановления: <strong>${code}</strong></p>
     <p>Не сообщайте его никому.</p>`
    );
