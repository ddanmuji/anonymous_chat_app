# ๐ซฅ Anonymous Chat App

[DEMO](https://jebong-chat.herokuapp.com/) ๋ฒ์  ๋ณด๋ฌ๊ฐ๊ธฐ
- ๊ฐ๋จํ ์ต๋ช ์ฑํ ์ฑ ๋ง๋ค๊ธฐ
- nestjs, mvc pattern, socket.io

<br />

## โ๐ผ lesson learned

### ์ ๋์บ์คํ (emit & on)

#### emit

- ์ก์  ์ด๋ฒคํธ ๋ฐ์
- emit์ ์์ผ์ ํตํด์ ์ด๋ฒคํธ๋ฅผ ๋ณด๋ผ ๋ ์ฌ์ฉ์ด ๋๋ค.

#### on

- ์์  ์ด๋ฒคํธ ๋ฑ๋ก
- emit์ผ๋ก ๋ฐ์ํ ์ด๋ฒคํธ๋ฅผ on์ผ๋ก ๋ฐ์ ์ ์๋ค.

<br />

### ๋ค์์คํ์ด์ค

`namespace`๋ ๋ง์น http ์ฐ๊ฒฐ ๋ฐฉ์์์ ์๋ ํฌ์ธํธ๋ก api๋ฅผ ๋๋ ๊ฒ์ฒ๋ผ url์ ์ง์ ๋ ์์น์ ๋ฐ๋ผ ์ ํธ์ ์ฒ๋ฆฌ๋ฅผ ๋ค๋ฅด๊ฒ ํ  ์ ์๋ ๊ธฐ๋ฅ์ ๋งํ๋ค. <br />
socket์ ๊ทธ๋ฅ ์ฌ์ฉํ๊ฒ ๋๋ฉด ๋ฐ์ดํฐ๊ฐ ๋ชจ๋  socket์ผ๋ก ๋ค์ด๊ฐ๊ฒ๋์ด **๋ถํ์ํ ๋ญ๋น๊ฐ ๋ฐ์ํ๊ฒ ๋๋ค.** <br />
ํด๋น ์๋ฃจ์์ผ๋ก **ํน์  ๋ธ๋๋ผ๋ฆฌ๋ง ์ฐ๊ฒฐ**ํ์ฌ ๋ถํ์ํ ๋ญ๋น๋ฅผ ์์จ ์ ์๋๋ฐ ์ด๊ฒ์ด `namespace` ์ด๋ค.
<br />

๋ค๋ฅธ `namespace`๋ฅผ ๋ง๋ค์ด์ ์ ํธ๋ฅผ ๊ฐ๊ธฐ ๋๋ฆฝ์ ์ผ๋ก ์ฒ๋ฆฌํ  ์๋ ์๋ค. <br />
์ฆ, ์ง์ ํ `namespace`์ ์๋ ์์ผ ๋ผ๋ฆฌ๋ง ํต์ ํ๋ค๋ ๊ฐ๋์ด๋ค.

> namespace๋ ๋จ์ด ๊ทธ๋๋ก ์ด๋ฆ์ด ๋ถ์ ๊ณต๊ฐ์ด๋ฉฐ, ์์ผ์ ๋ฌถ์ด์ฃผ๋ ๋จ์๋ผ๊ณ  ์๊ฐํ๋ฉด ๋๋ค.

<br />

### ๊ฒ์ดํธ์จ์ด Lifecycle hooks

nestjs๋ 3๊ฐ์ง์ `lifecycle hooks`์ ์ฌ์ฉํ  ์ ์๊ฒ ์ ๊ณตํ๋ค.

#### OnGatewayInit

- `afterInit()`๋ฉ์๋๋ฅผ ํ์๋ก ๊ตฌํํด์ผ ํ๋ฉฐ, ๋ผ์ด๋ธ๋ฌ๋ฆฌ ํน์  ์๋ฒ ์ธ์คํด์ค๋ฅผ ์ธ์๋ก ์ฌ์ฉํ๋ค.
- ํ์ํ ๊ฒฝ์ฐ ๋๋จธ์ง๋ฅผ ํ์ฐ์ํจ๋ค.
- `afterInit()`๋ ๊ฒ์ดํธ ์จ์ด๊ฐ ์คํ๋๊ณ  **๊ฐ์ฅ ๋จผ์  ์คํ**๋๋ ๋ฉ์๋์ด๋ค.
```ts
@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit {
  private logger = new Logger('test');

  afterInit() {
    this.logger.log('init');
  }

  //...
}
```

<br />

#### OnGatewayConnection

- `handleConnection()`๋ฉ์๋๋ฅผ ํ์๋ก ๊ตฌํํด์ผ ํ๋ฉฐ, ๋ผ์ด๋ธ๋ฌ๋ฆฌ ํน์  ํด๋ผ์ด์ธํธ ์์ผ ์ธ์คํด์ค๋ฅผ ์ธ์๋ก ์ฌ์ฉํ๋ค.
- `handleConnection()`๋ **connection์ด ๋์๋ง์ ์คํ**๋๋ ๋ฉ์๋ ์ด๋ค.

```ts
@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection {
  private logger = new Logger('test');

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connect id: ${socket.id} namespace: ${socket.nsp.name}`);
  }

  //...
}
```

<br />

#### OnGatewayDisconnect

- `handleDisconnect()`๋ฉ์๋๋ฅผ ๊ตฌํํด์ผ ํ๋ฉฐ, ๋ผ์ด๋ธ๋ฌ๋ฆฌ ํน์  ํด๋ผ์ด์ธํธ ์์ผ ์ธ์คํด์ค๋ฅผ ์ธ์๋ก ์ฌ์ฉํ๋ค.
- `handleDisconnect()`๋ **client์ server์ ์ฐ๊ฒฐ์ด ๋๊ฒผ์ ๋ ์คํ**๋๋ ๋ฉ์๋ ์ด๋ค.

<br />

```ts
@WebSocketGateway()
export class ChatsGateway implements OnGatewayDisconnect {
  private logger = new Logger('test');

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(
      `disConnect id: ${socket.id} namespace: ${socket.nsp.name}`,
    );
  }

  //...
}
```

<br />

### ๋ธ๋ก๋์บ์คํ

- ์ฐ๊ฒฐ๋ ๋ชจ๋  client๋ค์๊ฒ ๋ฐ์ดํฐ๋ฅผ ํ ๋ฒ์ ์ ์ก์ด ํ์ํ  ๋ ๋ธ๋ก๋์บ์คํ ์ด๋ผ๋ ์ด๋ฒคํธ๋ฅผ ์ฌ์ฉํ๊ฒ ๋๋ค.
- server์์ ๋ธ๋ก๋์บ์คํ ์ด๋ฒคํธ๋ฅผ ๋ฑ๋กํ๋ฉฐ ํด๋น ์ด๋ฒคํธ๊ฐ ๋ฐ์ ์ ์ฐ๊ฒฐ๋ `๋ชจ๋  socket๋ค์๊ฒ๋ ์๋ก์ด ์ ๋ณด๋ฅผ ์ ์ก`ํ๊ฒ ๋๋ค.

```ts
@WebSocketGateway()
export class ChatsGateway {
  //...

  @SubscribeMessage('new_user')
  handleNewUser(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    /** 
     * @description user_connected ๋ผ๋ ๋ธ๋ก๋์บ์คํ ์ด๋ฒคํธ๋ฅผ ๋ฑ๋ก 
     * @description ์ client ์์ socket์ด ์ฐ๊ฒฐ๋  ๋ ๋ง๋ค ์ฐ๊ฒฐ๋ ๋ชจ๋  client์๊ฒ ๋ฐ์ดํฐ ์ ์ก
    */
    socket.broadcast.emit('user_connected', username);
    return username;
  }
}
```

<br />

## โ๏ธ setting

- .env ๊ตฌ์ฑ

```
MONGO_URL=...
```
