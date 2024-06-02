import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { PrivateUserResponseDto } from './dto/res/private-user.response.dto';
import { UserService } from './user.service';
import { UserResponseDto } from "./dto/res/user-response.dto";

@ApiTags('Users')
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiNotFoundResponse({ description: 'Not found' })
@Controller('users')
@ApiOkResponse({ type: PrivateUserResponseDto })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(
    @Body() dto: CreateUserReqDto,
  ): Promise<UserResponseDto> {
    return await this.userService.create(dto);
  }

  @Get()
  public async findAll(): Promise<any> {
    return await this.userService.findAll();
  }
  @ApiBearerAuth()
  @Get(':id')
  public async findOne(
    @Param('id') id: string,
  ): Promise<PrivateUserResponseDto> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserReqDto,
  ): Promise<any> {
    return await this.userService.update(id, updateUserDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<any> {
    return this.userService.remove(id);
  }
}
