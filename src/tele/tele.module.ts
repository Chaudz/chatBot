import { Module } from '@nestjs/common';
import { TeleController } from './tele.controller';
import { TeleService } from './tele.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TeleController],
  providers: [TeleService],
})
export class TeleModule {}
