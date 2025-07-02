"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: ["http://localhost:3000", "https://gal-liard.vercel.app"],
        credentials: true,
        exposedHeaders: ['set-cookie'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        optionsSuccessStatus: 200
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('GAL Backend API')
        .setDescription('The GAL Backend API documentation')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(process.env.PORT || 4200);
    console.log(`Application is running on port ${process.env.PORT || 4200}`);
}
bootstrap();
//# sourceMappingURL=main.js.map