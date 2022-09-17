const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const chatFormElement = getElementById('chat_form');

function helloUser() {
	const username = prompt('이름을 입력해주세요');
}

function init() {
	helloUser();
}

init();
