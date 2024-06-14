import { UserEntity } from '../../../database/entities/user.entity';
import { PublicUserResDto } from '../dto/res/public-user.res.dto.';
import { UserResDto } from '../dto/res/user.res.dto';

export class UserMapperService {
  public static toResponseDTO(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio || null,
      image: user.avatar || null,
      isFollowed: user.followings ? user.followings.length < 0 : false,
    };
  }
  public static toPublicResponseDTO(user: UserEntity): PublicUserResDto {
    return {
      name: user.name,
      bio: user.bio,
      image: user.avatar,
    };
  }
}
