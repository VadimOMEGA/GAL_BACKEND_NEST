import { Body, Controller, HttpCode, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CurrentAdmin } from 'src/auth/decorators/admin.decorator';
import { AdminDto } from './dto/admin.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerUpdateAdmin } from './decorators/swagger.decorators';

@ApiTags('👤 Admin Profile')
@Controller('admin/profile')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @SwaggerUpdateAdmin()
  @Auth()
  async updateAdmin(@CurrentAdmin('_id' as any) id: string, @Body() dto: AdminDto) {
    return this.adminService.update(id, dto)
  }
}
