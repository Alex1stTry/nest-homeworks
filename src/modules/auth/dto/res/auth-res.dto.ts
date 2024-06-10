import { UserResDto } from '../../../user/dto/res/user.res.dto';
import { ITokensPair } from '../../interfaces/tokens.interface';

export class AuthResDto {
  tokens: ITokensPair;
  user: UserResDto;
}
