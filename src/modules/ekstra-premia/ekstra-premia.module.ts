import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EkstraPremiaEntity } from './ekstra-premia.entity';
import { EkstraPremiaController } from './ekstra-premia.controller';
import { EkstraPremiaService } from './ekstra-premia.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ EkstraPremiaEntity ]),
		HttpModule,
	],
	controllers: [
		EkstraPremiaController,
	],
	providers: [
		EkstraPremiaService,
	],
})
export class EkstraPremiaModule {
}
