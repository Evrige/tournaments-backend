// sse.controller.ts
import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { SseService } from './sse.service';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "../users/users.service";

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService,
              private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async sse(@Res() res: Response, @Req() req) {
    const userData = await this.usersService.findUserByid(req.user.userId);

    this.sseService.sendEvent(userData);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const events = this.sseService.getEvents();
    events.subscribe(data => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  }
}
