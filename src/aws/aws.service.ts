import { DeleteObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'

@Injectable()
export class AwsService {
	private s3 = new S3Client({
		region: process.env.AWS_REGION || 'eu-north-1',
		credentials: {
			accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY || '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
		}
	})

	async generateUploadLink(destination: string) {
		const hash = crypto.randomBytes(8).toString('hex')
    	const fileName = `${destination}/${hash}.png`

		const command = new PutObjectCommand({
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: fileName
		})

		const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 })

		return {
			success: true,
			uploadUrl: uploadUrl,
			publicUrl: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}.cloudfront.net/${fileName}`,
			key: fileName
		}
	}

	async deleteImages(images: string[]) {
		const keys = images.map((image) => ({
			Key: image.replace(`https://${process.env.AWS_CLOUDFRONT_DOMAIN}.cloudfront.net/`, '')
		}))

		await this.s3.send(
			new DeleteObjectsCommand({
				Bucket: process.env.AWS_BUCKET_NAME,
				Delete: { Objects: keys }
			})
		)

		return {
			success: true
		}
	}
}
