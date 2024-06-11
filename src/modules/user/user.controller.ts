import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { UserService } from './services/user.service';

@ApiTags('Users')
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiNotFoundResponse({ description: 'Not found' })
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  public async findAll(): Promise<any> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @SkipAuth()
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return await this.userService.findOne(id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserReqDto,
  ): Promise<any> {
    // return this.userService.updateMe(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.userService.remove(id);
  }
}
