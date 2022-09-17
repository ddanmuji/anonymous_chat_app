import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppController } from './app.controller';
import { ChatsModule } from './chats/chats.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(process.env.MONGO_URL),
		ChatsModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule implements NestModule {
	configure() {
		const isDev = process.env.MODE === 'dev' ? true : false;
		mongoose.set('debug', isDev);
	}
}
