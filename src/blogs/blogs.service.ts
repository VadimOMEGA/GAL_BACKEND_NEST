import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Blog, BlogDocument } from 'src/schemas/blog.schema'
import { BlogDto } from './dto/blog.dto'
import { AwsService } from 'src/aws/aws.service'
import { GetBlogsDto } from './dto/get-blogs.dto'

@Injectable()
export class BlogsService {
	constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
        private readonly awsService: AwsService
    ) {}

	async getAll(getBlogsDto: GetBlogsDto) {
        const { page = 1, limit = 12, q, content_type, category } = getBlogsDto;
        const skip = (page - 1) * limit

        const query: any = {};

        if(q) {
            query.$or = [
                { 'title.ro' : { $regex: q, $options: 'i' } },
                { 'title.en' : { $regex: q, $options: 'i' } },
                { 'title.ru' : { $regex: q, $options: 'i' } },
                { 'summary.column1.ro': { $regex: q, $options: 'i' } },
                { 'summary.column1.ru': { $regex: q, $options: 'i' } },
                { 'summary.column1.en': { $regex: q, $options: 'i' } },
                { 'summary.column2.ro': { $regex: q, $options: 'i' } },
                { 'summary.column2.ru': { $regex: q, $options: 'i' } },
                { 'summary.column2.en': { $regex: q, $options: 'i' } },
                { content_type: { $regex: q, $options: 'i' } },
                { categories: { $regex: q, $options: 'i' } }
            ]
        }

        if(content_type) query.content_type = content_type;
        if(category) query.categories = { $in: [category] };

        const [ blogs, total ] = await Promise.all([
            this.blogModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            this.blogModel.countDocuments(query).exec()
        ])

		return {
            blogs,
            pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1
            },
            filters: {
            searchTerm: q,
            contentType: content_type,
            category
            }
        };
	}

	async getById(id: string) {
		const blog = await this.blogModel.findById(id).exec()
		if (!blog) throw new NotFoundException('Blog not found')
		return blog
	}

	async create(dto: BlogDto) {
		const blog = (await this.blogModel.create(dto)).toObject()

		return blog
	}

    async update(id: string, dto: Partial<BlogDto>) {
        if (!dto || Object.keys(dto).length === 0) throw new BadRequestException('No data provided')
        let data = dto

        return this.blogModel.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(id: string) {
        const blog = await this.blogModel.findByIdAndDelete(id).exec()
        if (!blog) throw new NotFoundException('Blog not found')
        return blog
    }

    // For image upload

    async generateImageUploadLink(blogId: string) {
        return this.awsService.generateUploadLink(blogId, "BLOGS")
    }

    async deleteBlogImages(imageUrls: string[]) {
        return this.awsService.deleteImages(imageUrls)
    }
}
