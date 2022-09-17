import { Socket } from 'socket.io';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway {
	@SubscribeMessage('new_user')
	handleNewUser(
		@MessageBody() username: string,
		@ConnectedSocket() socket: Socket,
	) {
		console.log(username);
		socket.emit('hello_user', `hello ${username}`);
	}
}
