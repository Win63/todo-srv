import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TelegrafModule } from 'nestjs-telegraf'
import { join } from 'path'
import * as LocalSession from 'telegraf-session-local'
import { AppService } from './app.service'
import { AppUpdate } from './app.update'
import { TG_TOKEN } from './config'
import { TaskEntity } from './tasks/entities/task.entity'
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TaskUserEntity } from './users/entities/taskUser.entity'

const sessions = new LocalSession({ database: 'session_db.json' })

@Module({
	imports: [
		TelegrafModule.forRoot({
			middlewares: [sessions.middleware()],
			token: TG_TOKEN
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'dpg-cjlq587v9s6c73bsmf9g-a',
			port: 5432,
			database: 'testtodo',
			username: 'pguser',
			password: 'ej2PvkhWINlJuIbSNSuO7KPihlgbBsaC',
			entities: [join(__dirname, '**', '*.entity.{ts,js}')],
			migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
			synchronize: true
		}),
		TypeOrmModule.forFeature([TaskEntity]),
		TypeOrmModule.forFeature([TaskUserEntity]),
		TasksModule,
		UsersModule
	],
	providers: [AppService, AppUpdate]
})
export class AppModule {}
