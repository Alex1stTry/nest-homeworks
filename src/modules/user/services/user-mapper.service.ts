import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../dto/res/user.res.dto';

export class UserMapperService {
  public static toResponseDTO(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio || null,
      image: user.avatar || null,
    };
  }
}
