# 🫥 Anonymous Chat App

- 간단한 익명 채팅 앱 만들기
- nestjs, mvc pattern, web socket

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

### gateway lifecycle

gateway lifecycle

<br />

### 브로드캐스팅

브로드캐스팅

<br />

## ⚙️ setting

- .env 구성

```
MONGO_URL=...
```
