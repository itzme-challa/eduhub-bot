import fs from 'fs';
import path from 'path';

const USERS_FILE = path.resolve(__dirname, '../../data/users.json');

export const saveChatId = (chatId: number): boolean => {
  try {
    let data: number[] = [];
    if (fs.existsSync(USERS_FILE)) {
      const raw = fs.readFileSync(USERS_FILE, 'utf-8');
      data = JSON.parse(raw);
    }

    if (!data.includes(chatId)) {
      data.push(chatId);
      fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
      return true; // New ID added
    }

    return false; // Already exists
  } catch (err) {
    console.error('Failed to save chatId:', err);
    return false;
  }
};

export const getAllChatIds = (): number[] => {
  try {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to get chat IDs:', err);
    return [];
  }
};
