import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'identification of user',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'Petya',
    description: 'name of user',
  })
  public readonly name: string;

  @ApiProperty({
    example: '18',
    description: 'age of user',
  })
  public readonly age: number;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'email of user',
    format: 'email',
  })
  public readonly email: string;

  @ApiProperty({
    example: '+380630508150',
    description: 'phone of user',
  })
  public readonly phone?: string;

  @ApiProperty({
    example: 'avatar',
    description: 'photo of user',
  })
  public readonly avatar?: string;
}
