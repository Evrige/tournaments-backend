import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../users/dto/user.dto";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private JwtService: JwtService) {
  }

  async registration(User: CreateUserDto): Promise<{ user: UserDto,accessToken: string, refreshToken: string }> {
    const user = await this.usersService.findUser(User.email);
    if (user) throw new HttpException("User already registered", HttpStatus.BAD_REQUEST);

    const hashPassword = await bcrypt.hash(User.password, 5);
    const newUser = await this.usersService.createUser({ ...User, password: hashPassword });
    return this.generateToken(newUser);
  }

  async generateToken(user: UserDto): Promise<{ user: UserDto,accessToken: string, refreshToken: string }>{
    return {
      user: user,
      accessToken: this.JwtService.sign({nickname: user.nickname, userId:user.id}),
      refreshToken: this.JwtService.sign({nickname: user.nickname, userId:user.id}),
    };
  }

  async refreshTokens(refreshToken: string): Promise<{ user: UserDto,accessToken: string, refreshToken: string }>{
    try {
      const decodedToken = this.JwtService.verify(refreshToken);
      return this.generateToken(decodedToken as UserDto);
    } catch (error) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(email);
    const pass = await bcrypt.compare(password, user.password);
    if (user && pass) {
      return user;
    }
    return null;
  }

}
