import { Socket } from 'socket.io';
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

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	private logger = new Logger('chat');

	afterInit() {
		this.logger.log('init');
	}

	handleConnection(@ConnectedSocket() socket: Socket) {
		this.logger.log(`connect id: ${socket.id} namespace: ${socket.nsp.name}`);
	}

	handleDisconnect(@ConnectedSocket() socket: Socket) {
		this.logger.log(
			`disConnect id: ${socket.id} namespace: ${socket.nsp.name}`,
		);
	}

	@SubscribeMessage('new_user')
	handleNewUser(
		@MessageBody() username: string,
		@ConnectedSocket() socket: Socket,
	) {
		socket.broadcast.emit('user_connected', username);
		return username;
	}

	@SubscribeMessage('submit_chat')
	handleSubmitChat(
		@MessageBody() chat: string,
		@ConnectedSocket() socket: Socket,
	) {
		socket.broadcast.emit('new_chat', {
			chat,
			username: socket.id,
		});
	}
}
