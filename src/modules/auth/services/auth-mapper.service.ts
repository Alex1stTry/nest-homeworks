import { UserEntity } from '../../../database/entities/user.entity';
import { UserMapperService } from '../../user/services/user-mapper.service';
import { AuthResDto } from '../dto/res/auth-res.dto';
import { ITokensPair } from '../interfaces/tokens.interface';
import { IUserData } from '../interfaces/user-data.interface';

export class AuthMapperService {
  public static toResponseDTO(
    user: UserEntity,
    tokenPair: ITokensPair,
  ): AuthResDto {
    return {
      tokens: {
        accessToken: tokenPair.accessToken,
        refreshToken: tokenPair.refreshToken,
      },
      user: UserMapperService.toResponseDTO(user),
    };
  }
  public static toUserDataDTO(user: UserEntity, deviceId: string): IUserData {
    return {
      userId: user.id,
      email: user.email,
      deviceId,
    };
  }
}
