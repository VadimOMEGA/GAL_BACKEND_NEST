import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger'

export function SwaggerGetStatistics() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get statistics',
			description: 'Retrieve the site statistics (single record)'
		}),
		ApiResponse({
			status: 200,
			description: 'Statistics retrieved successfully',
			schema: {
				type: 'object',
				properties: {
					_id: { type: 'string', example: '507f1f77bcf86cd799439011' },
					title: {
						type: 'object',
						properties: {
							ro: { type: 'string', example: 'Statistici GAL' },
							ru: { type: 'string', example: 'Статистика ГАЛ' },
							en: { type: 'string', example: 'GAL Statistics' }
						}
					},
					image: { type: 'string', example: 'https://example.com/statistics-image.jpg' },
					projects_number: { type: 'string', example: '150' },
					activity_years: { type: 'string', example: '15' },
					population: { type: 'string', example: '45,000' },
					total_members: { type: 'string', example: '850' },
					business_members: { type: 'string', example: '320' },
					public_members: { type: 'string', example: '280' },
					civic_members: { type: 'string', example: '250' },
					createdAt: { type: 'string', format: 'date-time', example: '2024-07-02T10:30:00.000Z' },
					updatedAt: { type: 'string', format: 'date-time', example: '2024-07-02T15:45:00.000Z' }
				}
			}
		}),
		ApiResponse({
			status: 404,
			description: 'Statistics not found',
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Statistics not found' },
					error: { type: 'string', example: 'Not Found' },
					statusCode: { type: 'number', example: 404 }
				}
			}
		})
	)
}

export function SwaggerUpdateStatistics() {
	return applyDecorators(
		ApiOperation({
			summary: 'Update statistics',
			description: "Update site statistics (creates if doesn't exist). Supports partial updates."
		}),
		ApiBearerAuth('JWT-auth'),
		ApiBody({
			description: 'Statistics data to update (partial update supported)',
			schema: {
				type: 'object',
				properties: {
					title: {
						type: 'object',
						properties: {
							ro: { type: 'string', example: 'Statistici GAL Actualizate' },
							ru: { type: 'string', example: 'Обновленная статистика ГАЛ' },
							en: { type: 'string', example: 'Updated GAL Statistics' }
						}
					},
					image: { type: 'string', example: 'https://example.com/new-statistics-image.jpg' },
					projects_number: { type: 'string', example: '175' },
					activity_years: { type: 'string', example: '16' },
					population: { type: 'string', example: '48,000' },
					total_members: { type: 'string', example: '920' },
					business_members: { type: 'string', example: '350' },
					public_members: { type: 'string', example: '310' },
					civic_members: { type: 'string', example: '260' }
				}
			},
			examples: {
				partialUpdate: {
					summary: 'Update only numbers',
					value: {
						projects_number: '175',
						total_members: '920'
					}
				},
				fullUpdate: {
					summary: 'Update all fields',
					value: {
						title: {
							ro: 'Statistici GAL 2024',
							ru: 'Статистика ГАЛ 2024',
							en: 'GAL Statistics 2024'
						},
						image: 'https://example.com/stats-2024.jpg',
						projects_number: '175',
						activity_years: '16',
						population: '48,000',
						total_members: '920',
						business_members: '350',
						public_members: '310',
						civic_members: '260'
					}
				}
			}
		}),
		ApiResponse({
			status: 200,
			description: 'Statistics updated successfully',
			schema: {
				type: 'object',
				properties: {
					_id: { type: 'string', example: '507f1f77bcf86cd799439011' },
					title: {
						type: 'object',
						properties: {
							ro: { type: 'string', example: 'Statistici GAL Actualizate' },
							ru: { type: 'string', example: 'Обновленная статистика ГАЛ' },
							en: { type: 'string', example: 'Updated GAL Statistics' }
						}
					},
					image: { type: 'string', example: 'https://example.com/new-statistics-image.jpg' },
					projects_number: { type: 'string', example: '175' },
					activity_years: { type: 'string', example: '16' },
					population: { type: 'string', example: '48,000' },
					total_members: { type: 'string', example: '920' },
					business_members: { type: 'string', example: '350' },
					public_members: { type: 'string', example: '310' },
					civic_members: { type: 'string', example: '260' },
					createdAt: { type: 'string', format: 'date-time' },
					updatedAt: { type: 'string', format: 'date-time' }
				}
			}
		}),
		ApiResponse({
			status: 400,
			description: 'Bad request - Validation failed or no data provided',
			schema: {
				type: 'object',
				properties: {
					message: {
						type: 'array',
						items: { type: 'string' },
						example: ['title.ro should not be empty', 'projects_number should not be empty']
					},
					error: { type: 'string', example: 'Bad Request' },
					statusCode: { type: 'number', example: 400 }
				}
			}
		}),
		ApiResponse({
			status: 401,
			description: 'Unauthorized - JWT token required',
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Unauthorized' },
					statusCode: { type: 'number', example: 401 }
				}
			}
		})
	)
}

export function SwaggerInitializeStatistics() {
	return applyDecorators(
		ApiOperation({
			summary: 'Initialize statistics',
			description: 'Create initial statistics record. Only works if no statistics exist yet.'
		}),
		ApiBearerAuth('JWT-auth'),
		ApiBody({
			description: 'Complete statistics data for initialization',
			schema: {
				type: 'object',
				required: [
					'title',
					'image',
					'projects_number',
					'activity_years',
					'population',
					'total_members',
					'business_members',
					'public_members',
					'civic_members'
				],
				properties: {
					title: {
						type: 'object',
						required: ['ro', 'ru', 'en'],
						properties: {
							ro: { type: 'string', example: 'Statistici GAL' },
							ru: { type: 'string', example: 'Статистика ГАЛ' },
							en: { type: 'string', example: 'GAL Statistics' }
						}
					},
					image: {
						type: 'string',
						example: 'https://example.com/statistics-image.jpg',
						minLength: 1
					},
					projects_number: { type: 'string', example: '150', minLength: 1 },
					activity_years: { type: 'string', example: '15', minLength: 1 },
					population: { type: 'string', example: '45,000', minLength: 1 },
					total_members: { type: 'string', example: '850', minLength: 1 },
					business_members: { type: 'string', example: '320', minLength: 1 },
					public_members: { type: 'string', example: '280', minLength: 1 },
					civic_members: { type: 'string', example: '250', minLength: 1 }
				}
			}
		}),
		ApiResponse({
			status: 200,
			description: 'Statistics initialized successfully',
			schema: {
				type: 'object',
				properties: {
					_id: { type: 'string', example: '507f1f77bcf86cd799439011' },
					title: {
						type: 'object',
						properties: {
							ro: { type: 'string', example: 'Statistici GAL' },
							ru: { type: 'string', example: 'Статистика ГАЛ' },
							en: { type: 'string', example: 'GAL Statistics' }
						}
					},
					image: { type: 'string', example: 'https://example.com/statistics-image.jpg' },
					projects_number: { type: 'string', example: '150' },
					activity_years: { type: 'string', example: '15' },
					population: { type: 'string', example: '45,000' },
					total_members: { type: 'string', example: '850' },
					business_members: { type: 'string', example: '320' },
					public_members: { type: 'string', example: '280' },
					civic_members: { type: 'string', example: '250' },
					createdAt: { type: 'string', format: 'date-time' },
					updatedAt: { type: 'string', format: 'date-time' }
				}
			}
		}),
		ApiResponse({
			status: 400,
			description: 'Bad request - Statistics already exist or validation failed',
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Statistics already exist. Use update instead.' },
					error: { type: 'string', example: 'Bad Request' },
					statusCode: { type: 'number', example: 400 }
				}
			}
		}),
		ApiResponse({
			status: 401,
			description: 'Unauthorized - JWT token required',
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Unauthorized' },
					statusCode: { type: 'number', example: 401 }
				}
			}
		})
	)
}
