import { Injectable } from '@nestjs/common'
import { BlogsService } from 'src/blogs/blogs.service'
import { DocumentsService } from 'src/documents/documents.service'
import { BlogsContentTypeEnum } from 'src/enums/blog.enum'
import { ResponseTypeEnums } from 'src/enums/response.enum'
import { ManagementService } from 'src/management/management.service'

@Injectable()
export class SearchService {
	constructor(
		private readonly blogsService: BlogsService,
		private readonly documentsService: DocumentsService,
		private readonly managementService: ManagementService
	) {}

	async searchAll(query: string) {
		let management: any[] = []
		let documents: any[] = []
		let blogs: any[] = []

		if (!query || !query.trim()) {
			const allBlogsResult = await this.blogsService.getAll({ page: 1, limit: 50 })
			blogs = allBlogsResult.blogs
		} else {
			[management, documents, blogs] = await Promise.all([
				this.managementService.search(query, 1),
				this.documentsService.search(query, 1),
				this.blogsService.search(query, 50)
			])
		}

		const totalBlogs = blogs.length
		const totalNews = blogs.filter((b) => b.content_type === BlogsContentTypeEnum.NEWS).length
		const totalProject = blogs.filter((b) => b.content_type === BlogsContentTypeEnum.PROJECT).length
		const totalAuthenticLocal = blogs.filter(
			(b) => b.content_type === BlogsContentTypeEnum.AUTHENTIC_LOCAL
		).length

		const blogsWithType = blogs.map((item) => ({
			_id: item._id,
			title: item.title,
			content_type: item.content_type,
			authentic_local_content_type: item.authentic_local_content_type,
			response_type: ResponseTypeEnums.BLOG
		}))

		const documentsWithType = documents.map((item) => ({
			_id: item._id,
			title: {
				ro: 'Documente GAL - Arhiva de documente oficiale',
				ru: 'Документы GAL — Архив официальных документов',
				en: 'GAL Documents – Official Document Archive'
			},
			content_type: 'DOCUMENTS',
			authentic_local_content_type: 'DOCUMENTS',
			response_type: ResponseTypeEnums.DOCUMENT
		}))

		const managementWithType = management.map((item) => ({
			_id: item._id,
			title: {
				ro: 'Conducerea GAL – Echipa de management',
				ru: 'Руководство GAL — Управленческая команда',
				en: 'GAL Management – Management Team'
			},
			content_type: 'MANAGEMENT',
			authentic_local_content_type: 'MANAGEMENT',
			response_type: ResponseTypeEnums.MANAGEMENT
		}))

		return {
			results: [...blogsWithType, ...documentsWithType, ...managementWithType],
			stats: {
				total_blogs: totalBlogs,
				total_blogs_news: totalNews,
				total_blogs_project: totalProject,
				total_blogs_authentic_local: totalAuthenticLocal
			}
		}
	}
}
