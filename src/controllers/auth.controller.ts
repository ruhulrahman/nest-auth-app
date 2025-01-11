import { RegisterDto } from '@dto/registerDto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ message: string }> {
    await this.authService.register(registerDto.username, registerDto.password);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Res() res) {
    const token = await this.authService.login(body.username, body.password);
    res.cookie('SESSIONID', token, { httpOnly: true }); // Attach token as cookie
    return res.send({ message: 'Login successful', token });
  }

  @Post('logout')
  logout(@Res() res) {
    res.clearCookie('SESSIONID'); // Clear session cookie
    return res.send({ message: 'Logged out successfully' });
  }
}
