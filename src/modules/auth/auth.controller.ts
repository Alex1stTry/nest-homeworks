import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SignUpReqDto } from './dto/req/sign-up.req.dto';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReqDto): Promise<any> {
    return await this.authService.signUp(dto);
  }
}
