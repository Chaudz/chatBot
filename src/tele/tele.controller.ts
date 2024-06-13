import { Controller, Post, Body, Get } from '@nestjs/common';
import { TeleService } from './tele.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('tele')
export class TeleController {
  constructor(private readonly teleService: TeleService) {}

  @Post('send-message')
  async sendMessage(
    @Body('chatId') chatId: string,
    @Body('text') text: string,
  ): Promise<any> {
    return this.teleService.sendMessage(chatId, text);
  }

  @Get()
  getHello(): string {
    return 'Hello tele!';
  }
}
