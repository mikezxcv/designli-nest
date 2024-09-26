import { ApiProperty } from '@nestjs/swagger';
export class SignupDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
