import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { EkstraPensjaModule } from './modules/ekstra-pensja/ekstra-pensja.module';
import { TimeService } from './shared/services';
import { EkstraPremiaModule } from './modules/ekstra-premia/ekstra-premia.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		AuthModule,
		EkstraPensjaModule,
		EkstraPremiaModule,
	],
	providers: [
		TimeService,
	],
})
export class AppModule {
}
