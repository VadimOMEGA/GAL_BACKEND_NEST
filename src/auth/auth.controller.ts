import { Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerLogin, SwaggerLogout, SwaggerRefreshToken } from './decorators/swagger.decorators';

@ApiTags('🔐 Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  @SwaggerLogin()
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const {refreshToken, ...response} = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response
  }

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Post('register')
  // async register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
  //   const {refreshToken, ...response} = await this.authService.register(dto);
  //   this.authService.addRefreshTokenToResponse(res, refreshToken);

  //   return response;
  // }

  @HttpCode(200)
  @Post('login/access-token')
  @SwaggerRefreshToken()
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromCookies);

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response;
  }

  @Post('logout')
  @SwaggerLogout()
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);
    return { message: 'Logged out successfully' };
  }
}
