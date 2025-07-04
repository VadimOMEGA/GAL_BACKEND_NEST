import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AdminService } from 'src/admin/admin.service'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'
import { Response } from 'express'

@Injectable()
export class AuthService {
	REFRESH_TOKEN_NAME = 'refreshToken'
	EXPIRE_DAY_REFRESH_TOKEN = 1

	constructor(
		private jwt: JwtService,
		private adminService: AdminService
	) {}

	async login(dto: AuthDto) {
		const { password, ...admin } = (await this.validateAdmin(dto)).toObject()
		const tokens = this.issueTokens(admin._id.toString())

		return {
			admin,
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldAdmin = await this.adminService.getByUsername(dto.username)
		if (oldAdmin) throw new BadRequestException('User already exists')

		const { password, ...admin } = (await this.adminService.create(dto)).toObject()

		const tokens = this.issueTokens(admin._id.toString())

		return {
			admin,
			...tokens
		}
	}

	// helper methods

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)

		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const adminDoc = await this.adminService.getById(result.id)
		if (!adminDoc) throw new BadRequestException('Admin not found')

		const { password, ...admin } = adminDoc.toObject()

		const tokens = this.issueTokens(admin._id.toString())

		return { admin, ...tokens }
	}

	private issueTokens(adminId: string) {
		const data = { id: adminId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async validateAdmin(dto: AuthDto) {
		const admin = await this.adminService.getByUsername(dto.username)

		if (!admin) throw new NotFoundException('User not found')

		const isValid = await verify(admin.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid password')

		return admin
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			expires: expiresIn,
			secure: false, // ✅ Works in HTTP development
			sameSite: 'lax' // ✅ Works in development
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			expires: new Date(0),
			secure: false, // ✅ Works in HTTP development
			sameSite: 'lax' // ✅ Works in development
		})
	}
}
