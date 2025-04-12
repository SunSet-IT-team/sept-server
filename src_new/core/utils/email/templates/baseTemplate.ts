export const baseTemplate = (title: string, content: string) => `
  <div style="max-width: 600px; margin: auto; padding: 24px; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fff;">
    <div style="text-align: center;">
      <img src="https://your-site.com/logo.png" alt="Логотип" width="120" style="margin-bottom: 20px;" />
    </div>
    <h2 style="color: #333;">${title}</h2>
    <div style="font-size: 16px; color: #444; margin: 16px 0;">${content}</div>
    <hr style="margin: 24px 0;" />
    <footer style="font-size: 12px; color: #888;">
      Не отвечайте на него напрямую. Если письмо пришло по ошибке — проигнорируйте его.
    </footer>
  </div>
`;
