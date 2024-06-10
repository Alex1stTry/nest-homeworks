import { UserEntity } from '../../../database/entities/user.entity';
import { UserMapperService } from '../../user/services/user-mapper.service';
import { AuthResDto } from '../dto/res/auth-res.dto';
import { ITokensPair } from '../interfaces/tokens.interface';

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
}
