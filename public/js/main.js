const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const chatFormElement = getElementById('chat_form');

function helloUser() {
	const username = prompt('이름을 입력해주세요');
	socket.emit('new_user', username);
	console.log(username);
	socket.on('hello_user', (data) => console.log(data));
}

function init() {
	helloUser();
}

init();
