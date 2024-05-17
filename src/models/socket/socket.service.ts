import {
	OnGatewayConnection,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { UsersService } from "../users/users.service";
import { AuthService } from "../auth/auth.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
})
@WebSocketGateway()
export class SocketService implements OnGatewayConnection {
	constructor(private readonly usersService: UsersService,
							private readonly authService: AuthService,) {}

	@WebSocketServer()
	server: Server;

	async handleConnection(client: Socket) {
		const headers = client.handshake.headers;
		const cookieHeader = headers['cookie'];
		if (cookieHeader) {
			const cookies = cookieHeader.split(';').map(cookie => cookie.trim().split('='));
			const accessTokenCookie = cookies.find(([name]) => name === 'accessToken');

			if (accessTokenCookie) {
				const accessToken = accessTokenCookie[1];
				const data = await this.authService.verifyToken(accessToken)
				if (data) {
          await this.notifyUserChanges(client, data.userId);
        }
			}
		}
	}

	async notifyUserChanges(client: Socket, userId: number): Promise<any> {
		const user = await this.usersService.findUserByid(userId);
		if (user) {
			client.emit(`userChanges/${user.id}`, JSON.stringify(user));
		}
	}
}
