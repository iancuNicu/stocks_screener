import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/passport/guards/jwt-guard';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
}
