/* eslint-disable */

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
		const {
			page = 1,
			limit = 12,
			q,
			content_type,
			category,
			authentic_local_category
		} = getBlogsDto
		const skip = (page - 1) * limit

		const filters: any[] = []

		if (content_type) filters.push({ content_type })
		if (category) filters.push({ categories: category })
		if (authentic_local_category) filters.push({ authentic_local_category })

		// If search query exists — use Atlas Search
		if (q) {
			const aggregatePipeline: any[] = [
				{
					$search: {
						index: 'default', // your search index name
						compound: {
							should: [
								{ text: { query: q, path: 'title.ro', fuzzy: {} } },
								{ text: { query: q, path: 'title.en', fuzzy: {} } },
								{ text: { query: q, path: 'title.ru', fuzzy: {} } },
								{ text: { query: q, path: 'summary.column1.ro', fuzzy: {} } },
								{ text: { query: q, path: 'summary.column1.en', fuzzy: {} } },
								{ text: { query: q, path: 'summary.column1.ru', fuzzy: {} } },
								{ text: { query: q, path: 'summary.column2.ro', fuzzy: {} } },
								{ text: { query: q, path: 'summary.column2.en', fuzzy: {} } },
								{ text: { query: q, path: 'summary.column2.ru', fuzzy: {} } },
								{ text: { query: q, path: 'content_type', fuzzy: {} } },
								{ text: { query: q, path: 'categories', fuzzy: {} } },
								{ text: { query: q, path: 'authentic_local_category', fuzzy: {} } }
							]
						}
					}
				},
				...(filters.length ? [{ $match: { $and: filters } }] : []),
				{ $sort: { createdAt: -1 } },
				{ $skip: skip },
				{ $limit: limit },
				{
					$facet: {
						blogs: [{ $match: {} }],
						total: [{ $count: 'count' }]
					}
				}
			]

			const [result] = await this.blogModel.aggregate(aggregatePipeline).exec()

			const blogs = result?.blogs || []
			const total = result?.total?.[0]?.count || 0

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
					category,
					authenticLocalCategory: authentic_local_category
				}
			}
		}

		// If no search query — regular Mongo query
		const query: any = {}
		if (content_type) query.content_type = content_type
		if (category) query.categories = { $in: [category] }
		if (authentic_local_category) query.authentic_local_category = authentic_local_category

		const [blogs, total] = await Promise.all([
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
				category,
				authenticLocalCategory: authentic_local_category
			}
		}
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

	async generateImageUploadLink() {
		return this.awsService.generateUploadLink('BLOGS')
	}

	async deleteBlogImages(imageUrls: string[]) {
		return this.awsService.deleteImages(imageUrls)
	}
}
