import { OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

export class TelegramItineraryBot implements OnModuleInit {
  private bot: TelegramBot;
  // replace real admin telegram ID later
  private readonly admins: number[] = [5441575402, 5725095350];

  constructor() {
    const token = process.env.TELEGRAM_TOKEN;
    this.bot = new TelegramBot(token, { polling: true });
  }

  onModuleInit() {
    this.initBot();
  }

  private async initBot() {
    const mainMenu = {
      start: '/start',
      id: '/id',
    };

    this.admins.forEach((id) => {
      this.bot.sendMessage(id, 'Bắt đầu!', {
        reply_markup: {
          keyboard: [[{ text: mainMenu.start }, { text: mainMenu.id }]],
        },
      });
    });

    this.bot.onText(new RegExp(`${mainMenu.id}`, 'g'), async (data) => {
      this.handleID(data);
    });

    this.bot.onText(new RegExp(`${mainMenu.start}`, 'g'), async (data) => {
      this.handleStart(data);
    });
  }

  private handleStart(data: any) {
    const firstName = data.from?.first_name || 'Admin';
    const lastName = data.from?.last_name || 'Admin';

    const fullName = `${firstName} ${lastName}`.trim();

    this.bot.sendMessage(
      data.chat.id,
      `Chào ${fullName}, nhấn chọn nút từ bộ điều khiển để dùng.`,
      {
        reply_markup: {
          keyboard: [[{ text: '/start' }, { text: '/id' }]],
        },
      },
    );
  }

  private handleID(data: any) {
    this.bot.sendMessage(data.chat.id, `ID của bạn: ${data.chat.id}`, {
      reply_markup: {
        keyboard: [[{ text: '/start' }, { text: '/id' }]],
      },
    });
  }

  public async sendLogToAdmins(message: string) {
    this.admins.forEach((chatId) => {
      this.bot.sendMessage(chatId, message);
    });
  }

  // send any message to the chosen telegram provider also sends log to admin
  async sendMessage(teleId: string, message: string) {
    this.bot.sendMessage(teleId, message);
    this.sendLogToAdmins(message);
  }
}
