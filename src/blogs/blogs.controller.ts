import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { BlogsService } from './blogs.service'
import { BlogDto } from './dto/blog.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { DeleteImagesDto } from './dto/delete-images.dto'
import { UpdateBlogDto } from './dto/update-blog-dto'
import { GetBlogsDto } from './dto/get-blogs.dto'
import { SwaggerCreateBlog, SwaggerDeleteBlog, SwaggerDeleteImages, SwaggerGenerateUploadLink, SwaggerGetBlogById, SwaggerGetBlogs, SwaggerUpdateBlog } from './decorators/swagger.decorators'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('📝 Blogs')
@Controller('blogs')
export class BlogsController {
	constructor(private readonly blogsService: BlogsService) {}

	@Get()
	@SwaggerGetBlogs()
	@UsePipes(new ValidationPipe({ transform: true }))
	async getAll(@Query() getBlogsDto: GetBlogsDto) {
		return this.blogsService.getAll(getBlogsDto);
	}

	@Get(':id')
	@SwaggerGetBlogById()
	async getById(@Param('id') id: string) {
		return this.blogsService.getById(id)
	}

	@UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true }))
	@HttpCode(200)
	@Post()
	@SwaggerCreateBlog()
	@Auth()
	async create(@Body() dto: BlogDto) {
		return this.blogsService.create(dto)
	}

	@UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true, skipMissingProperties: false }))
	@HttpCode(200)
	@Put(':id')
	@SwaggerUpdateBlog()
	@Auth()
	async update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
		return this.blogsService.update(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@SwaggerDeleteBlog()
	@Auth()
	async delete(@Param('id') id: string) {
		return this.blogsService.delete(id)
	}

  // For image upload
  @HttpCode(200)
  @Post('/generate-upload-link')
  @SwaggerGenerateUploadLink()
  @Auth()
	async generateImageUploadLink() {
		return this.blogsService.generateImageUploadLink()
	}

  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @Post('delete-images')
  @SwaggerDeleteImages()
  @Auth()
  async deleteBlogImages(@Body() dto: DeleteImagesDto) {
    return this.blogsService.deleteBlogImages(dto.imageUrls)
  }
}
