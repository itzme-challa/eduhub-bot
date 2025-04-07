import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from '../../credentials.json'; // adjust path if needed

const SHEET_ID = '1BB4PfC4rL9Py5D9zyj0N15EZ2TiYKfuozw44NHqdvsk';

const doc = new GoogleSpreadsheet(SHEET_ID);

export const saveToSheet = async (chat: any) => {
  try {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const existing = await sheet.getRows();
    const alreadySaved = existing.some(row => row['Chat ID'] === String(chat.id));
    if (alreadySaved) return;

    await sheet.addRow({
      'Chat ID': chat.id,
      'Username': chat.username || '',
      'First Name': chat.first_name || '',
      'Date': new Date().toLocaleString()
    });
  } catch (err) {
    console.error('Sheet save failed:', err);
  }
};
