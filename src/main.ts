import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection } from 'typeorm';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ credentials: true, origin: 'http://localhost:4200', optionsSuccessStatus: 200 });
	await app.listen(3000);

	if (module.hot) {
		const connection = getConnection();

		if (connection.isConnected) {
			await connection.close();
		}
		module.hot.accept();
		module.hot.dispose(() => {
			app.close();
		});
	}
}

bootstrap();
