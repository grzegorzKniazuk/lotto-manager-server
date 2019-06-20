import { HttpModule, Module } from '@nestjs/common';
import { EkstraPensjaController } from './ekstra-pensja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EkstraPensjaEntity } from './ekstra-pensja.entity';
import { EkstraPensjaService } from './ekstra-pensja.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ EkstraPensjaEntity ]),
		HttpModule,
	],
	controllers: [
		EkstraPensjaController,
	],
	providers: [
		EkstraPensjaService,
	],
})
export class EkstraPensjaModule {
}
