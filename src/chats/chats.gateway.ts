import {
	ConnectedSocket,
	MessageBody,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Socket } from 'socket.io';
import { Model } from 'mongoose';
import { Chatting as ChattingModel } from './models/chattings.model';
import { Socket as SocketModel } from './models/sockets.model';
import { SocketEvent } from '../constants';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	private logger = new Logger('chat');

	constructor(
		@InjectModel(ChattingModel.name)
		private readonly chattingModel: Model<ChattingModel>,
		@InjectModel(SocketModel.name)
		private readonly socketModel: Model<SocketModel>,
	) {}

	afterInit() {
		this.logger.log('init');
	}

	handleConnection(@ConnectedSocket() socket: Socket) {
		this.logger.log(`connect id: ${socket.id} namespace: ${socket.nsp.name}`);
	}

	async handleDisconnect(@ConnectedSocket() socket: Socket) {
		const { id } = socket;
		const user = await this.socketModel.findOne({ id });
		if (user) {
			socket.broadcast.emit(SocketEvent.DISCONNECT_USER, user.username);
			await user.delete();
		}

		this.logger.log(
			`disConnect id: ${socket.id} namespace: ${socket.nsp.name}`,
		);
	}

	@SubscribeMessage('new_user')
	async handleNewUser(
		@MessageBody() username: string,
		@ConnectedSocket() socket: Socket,
	) {
		const { id } = socket;
		const exist = await this.socketModel.exists({ username });
		if (exist) username = `${username}_${Math.floor(Math.random() * 100)}`;
		await this.socketModel.create({ id, username });

		socket.broadcast.emit(SocketEvent.USER_CONNECTED, username);
		return username;
	}

	@SubscribeMessage('submit_chat')
	async handleSubmitChat(
		@MessageBody() chat: string,
		@ConnectedSocket() socket: Socket,
	) {
		const { id } = socket;
		const socketObj = await this.socketModel.findOne({ id });
		await this.chattingModel.create({ user: socketObj, chat });

		const { username } = socketObj;
		socket.broadcast.emit(SocketEvent.NEW_CHAT, { chat, username });
	}
}
