const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const chatFormElement = getElementById('chat_form');

/** @description global socket handler */
socket.on('user_connected', (username) =>
	console.log(`${username}님이 접속하셨습니다!`),
);

/** @returns hello_stranger 엘리먼트에 해당내용 삽입 */
const drawHelloStranger = (username) =>
	(helloStrangerElement.innerText = `Hello ${username} Stranger :)`);

/** @returns namespace가 chattings인 곳에 username데이터를 new_user라는 이벤트로 emit */
function helloUser() {
	const username = prompt('이름을 입력해주세요');
	socket.emit('new_user', username, (data) => {
		drawHelloStranger(data);
	});
}

function init() {
	helloUser();
}

init();
