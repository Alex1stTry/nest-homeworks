import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserService } from './services/user.service';

@ApiTags('Users')
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiNotFoundResponse({ description: 'Not found' })
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<any> {
    return await this.userService.findAll();
  }
  @ApiBearerAuth()
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<any> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<any> {
    return this.userService.remove(id);
  }
}
