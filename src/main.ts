import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: ["http://localhost:3000", "https://gal-liard.vercel.app"],
		credentials: true,
		exposedHeaders: ['set-cookie'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        optionsSuccessStatus: 200
	})

    const config = new DocumentBuilder()
        .setTitle('GAL Backend API')
        .setDescription('The GAL Backend API documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth',
        )
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)

	await app.listen(process.env.PORT || 4200)
	console.log(`Application is running on port ${process.env.PORT || 4200}`)
}
bootstrap()
