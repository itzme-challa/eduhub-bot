import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../../users.json');

export function saveChatId(chatId: number) {
  let chatIds: number[] = [];

  if (fs.existsSync(filePath)) {
    chatIds = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  if (!chatIds.includes(chatId)) {
    chatIds.push(chatId);
    fs.writeFileSync(filePath, JSON.stringify(chatIds, null, 2));
  }
}

export function getAllChatIds(): number[] {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
