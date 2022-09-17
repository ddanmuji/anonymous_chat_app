import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
	Chatting as ChattingModel,
	ChattingSchema,
} from './models/chattings.model';
import { Socket as SocketModel, SocketSchema } from './models/sockets.model';
import { ChatsGateway } from './chats.gateway';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: ChattingModel.name, schema: ChattingSchema },
			{ name: SocketModel.name, schema: SocketSchema },
		]),
	],
	providers: [ChatsGateway],
})
export class ChatsModule {}
