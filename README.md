# 🫥 Anonymous Chat App

- 간단한 익명 채팅 앱 만들기
- nestjs, mvc pattern, socket.io

<br />

## ✍🏼 lesson learned

### 유니캐스팅 (emit & on)

#### emit

- 송신 이벤트 발생
- emit은 소켓을 통해서 이벤트를 보낼 때 사용이 된다.

#### on

- 수신 이벤트 등록
- emit으로 발생한 이벤트를 on으로 받을 수 있다.

<br />

### 네임스페이스

`namespace`는 마치 http 연결 방식에서 엔드 포인트로 api를 나눈 것처럼 url에 지정된 위치에 따라 신호의 처리를 다르게 할 수 있는 기능을 말한다. <br />
socket을 그냥 사용하게 되면 데이터가 모든 socket으로 들어가게되어 **불필요한 낭비가 발생하게 된다.** <br />
해당 솔루션으로 **특정 노드끼리만 연결**하여 불필요한 낭비를 없앨 수 있는데 이것이 `namespace` 이다.
<br />

다른 `namespace`를 만들어서 신호를 각기 독립적으로 처리할 수도 있다. <br />
즉, 지정한 `namespace`에 있는 소켓 끼리만 통신한다는 개념이다.

> namespace는 단어 그대로 이름이 붙은 공간이며, 소켓을 묶어주는 단위라고 생각하면 된다.

<br />

### 게이트웨이 Lifecycle hooks

nestjs는 3가지의 `lifecycle hooks`을 사용할 수 있게 제공한다.

#### OnGatewayInit

- `afterInit()`메서드를 필수로 구현해야 하며, 라이브러리 특정 서버 인스턴스를 인수로 사용한다.
- 필요한 경우 나머지를 확산시킨다.
- `afterInit()`는 게이트 웨이가 실행되고 **가장 먼저 실행**되는 메서드이다.
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

- `handleConnection()`메서드를 필수로 구현해야 하며, 라이브러리 특정 클라이언트 소켓 인스턴스를 인수로 사용한다.
- `handleConnection()`는 **connection이 되자마자 실행**되는 메서드 이다.

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

- `handleDisconnect()`메서드를 구현해야 하며, 라이브러리 특정 클라이언트 소켓 인스턴스를 인수로 사용한다.
- `handleDisconnect()`는 **client와 server의 연결이 끊겼을 때 실행**되는 메서드 이다.

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

### 브로드캐스팅

- 연결된 모든 client들에게 데이터를 한 번에 전송이 필요할 때 브로드캐스팅 이라는 이벤트를 사용하게 된다.
- server에서 브로드캐스팅 이벤트를 등록하며 해당 이벤트가 발생 시 연결된 `모든 socket들에게도 새로운 정보를 전송`하게 된다.

```ts
@WebSocketGateway()
export class ChatsGateway {
  //...

  @SubscribeMessage('new_user')
  handleNewUser(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    /** 
     * @description user_connected 라는 브로드캐스팅 이벤트를 등록 
     * @description 새 client 에서 socket이 연결될 때 마다 연결된 모든 client에게 데이터 전송
    */
    socket.broadcast.emit('user_connected', username);
    return username;
  }
}
```

<br />

## ⚙️ setting

- .env 구성

```
MONGO_URL=...
```
