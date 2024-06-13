import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment-timezone';

@Injectable()
export class TeleService {
  private readonly botToken = process.env.TELEGRAM_TOKEN;
  private bot: TelegramBot;

  constructor(private readonly httpService: HttpService) {
    console.log(this.botToken);
    this.bot = new TelegramBot(this.botToken, { polling: true });
  }

  async sendMessage(chatId: string, text: string): Promise<any> {
    const payload = {
      chat_id: chatId,
      text: text,
    };
    console.log(this.botToken);

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${this.botToken}/sendMessage`,
        payload,
      );
      console.log(response);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async handleCron() {
  //   const listSchedule = [
  //     {
  //       id: 1,
  //       text: 'Thứ hai học các môn\n- Tiếng anh ca 1 phòng 708\n- Cơ sở dữ liệu ca 2 phòng 902',
  //     },
  //     {
  //       id: 2,
  //       text: 'Thứ hai học các môn\n- Tiếng anh ca 1 phòng 708\n- Cơ sở dữ liệu ca 2 phòng 902',
  //     },
  //     {
  //       id: 3,
  //       text: 'Thứ hai học các môn\n- Tiếng anh ca 1 phòng 708\n- Cơ sở dữ liệu ca 2 phòng 902',
  //     },
  //     {
  //       id: 4,
  //       text: 'Thứ hai học các môn\n- Tiếng anh ca 1 phòng 708\n- Cơ sở dữ liệu ca 2 phòng 902',
  //     },
  //     {
  //       id: 5,
  //       text: 'Thứ hai học các môn\n- Tiếng anh ca 1 phòng 708\n- Cơ sở dữ liệu ca 2 phòng 902',
  //     },
  //     {
  //       id: 6,
  //       text: 'Thứ hai học các môn\n- Tiếng anh ca 1 phòng 708\n- Cơ sở dữ liệu ca 2 phòng 902',
  //     },
  //   ];

  //   // Lấy ngày và giờ hiện tại theo múi giờ "Asia/Ho_Chi_Minh"
  //   const now = moment().tz('Asia/Ho_Chi_Minh');

  //   // Lấy thứ hiện tại (0 = Chủ Nhật, 1 = Thứ Hai, ..., 6 = Thứ Bảy)
  //   const dayOfWeek = now.day();
  //   console.log(typeof dayOfWeek);

  //   // Lấy giờ hiện tại
  //   const currentTime = now.format('HH:mm:ss');

  //   console.log(currentTime);
  //   const fiveOclock = currentTime === '05:00:00' ? 1 : 0;
  //   console.log(fiveOclock);

  //   if (fiveOclock !== 1) return;

  //   if (dayOfWeek === 1) {
  //     this.bot.sendMessage(process.env.GROUP_ID, listSchedule[0].text);
  //   } else if (dayOfWeek === 2) {
  //     this.bot.sendMessage(process.env.GROUP_ID, listSchedule[1].text);
  //   } else if (dayOfWeek === 3) {
  //     this.bot.sendMessage(process.env.GROUP_ID, listSchedule[2].text);
  //   } else if (dayOfWeek === 4) {
  //     this.bot.sendMessage(process.env.GROUP_ID, listSchedule[3].text);
  //   } else if (dayOfWeek === 5) {
  //     this.bot.sendMessage(process.env.GROUP_ID, listSchedule[4].text);
  //   } else if (dayOfWeek === 6) {
  //     this.bot.sendMessage(process.env.GROUP_ID, listSchedule[5].text);
  //   }
  // }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleGetUp() {
    const now = moment().tz('Asia/Ho_Chi_Minh');

    // Lấy thứ hiện tại (0 = Chủ Nhật, 1 = Thứ Hai, ..., 6 = Thứ Bảy)
    const dayOfWeek = now.day();
    console.log(typeof dayOfWeek);

    // Lấy giờ hiện tại
    const currentTime = now.format('HH:mm:ss');
    console.log(currentTime);

    const fiveOclock = currentTime === '10:00:00' ? 1 : 0;

    if (fiveOclock !== 1) return;
    console.log('ok');
    this.bot.sendMessage(
      process.env.GROUP_ID,
      `*Dưới đây là một số công việc bạn có thể làm lúc 10h sáng để có một ngày hiệu quả:*
    *- Bắt đầu công việc hoặc học tập:*
      Thực hiện các nhiệm vụ công việc hoặc học tập quan trọng
      Giải quyết các công việc cần sự tập trung cao
    *- Tập thể dục nhẹ nhàng:*
      Thực hiện một buổi tập yoga ngắn
      Đi bộ nhanh để tăng cường năng lượng
    *- Lên kế hoạch cho ngày:*
      Kiểm tra lại lịch trình và lập danh sách công việc
      Ghi chú các mục tiêu cần hoàn thành
    *- Gặp gỡ, họp mặt:*
      Tham gia các cuộc họp hoặc gặp gỡ đối tác
      Trao đổi với đồng nghiệp về dự án
    *- Đọc sách hoặc nghiên cứu:*
      Đọc sách để cập nhật kiến thức mới
      Nghiên cứu tài liệu liên quan đến công việc
    *- Chăm sóc bản thân:*
      Uống nước, ăn nhẹ để giữ sức khỏe
      Thư giãn ngắn trước khi tiếp tục công việc
    *- Thực hiện các công việc nhà:*
      Dọn dẹp hoặc làm các việc nhà nếu làm việc tại nhà
    *- Tham gia khóa học trực tuyến:*
      Tham gia các bài giảng hoặc thực hiện bài tập
      Học các kỹ năng mới trực tuyến
    *- Giải trí nhẹ nhàng:*
      Nghe nhạc, xem video để thư giãn
      Làm những gì bạn thích để giảm căng thẳng`,
      { parse_mode: 'Markdown' },
    );
  }
}
