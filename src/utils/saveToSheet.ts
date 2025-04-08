export const saveToSheet = async (chat: any) => {
  try {
    await fetch('https://script.google.com/macros/s/AKfycbxPSovbzjZv7RSgIkQKc7C9f3UTY2G2i2HvNevLt9OPxVEYaOr3S-BrCZr3lRC_zbRn/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: chat.id,
        username: chat.username || '',
        first_name: chat.first_name || '',
      }),
    });
  } catch (e) {
    console.error('Google Sheet Save Failed:', e);
  }
};
