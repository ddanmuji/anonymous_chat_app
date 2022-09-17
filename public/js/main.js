const socket = io('/chattings');

/** @param {string} id 해당 엘리먼트 id */
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const chatFormElement = getElementById('chat_form');

/**
 * @param {string} username
 * @description global socket handler
 */
socket.on('user_connected', (username) =>
	drawNewChat(`${username}님이 접속하셨습니다!`),
);

socket.on('new_chat', (data) => {
	const { chat, username } = data;
	drawNewChat(`${username}: ${chat}`);
});

socket.on('disconnect_user', (username) =>
	drawNewChat(`${username}님이 퇴장하셨습니다.`),
);

/**
 * @param {SubmitEvent} event
 * @description chat form submit 이벤트리스너
 */
const onSubmitChatForm = (event) => {
	event.preventDefault();
	const inputElement = event.target.elements[0];

	if (inputElement.value !== '') {
		socket.emit('submit_chat', inputElement.value);
		drawNewChat(`나: ${inputElement.value}`);
		inputElement.value = '';
	}
};

/**
 * @param {string} username
 * @returns hello_stranger 엘리먼트에 해당내용 삽입
 */
const drawHelloStranger = (username) =>
	(helloStrangerElement.innerText = `${username}님이 접속하셨습니다!`);

/**
 * @param {string} message
 * @param {boolean} isMe
 * @returns chatting_box 엘리먼트안에 채팅 기록 삽입
 * */
const drawNewChat = (message, isMe = false) => {
	const wrapperChatBox = document.createElement('div');
	let chatBox;

	if (isMe) chatBox = `<div>${message}</div>`;
	else chatBox = `<div>${message}</div>`;

	wrapperChatBox.innerHTML = chatBox;
	chattingBoxElement.append(wrapperChatBox);
};

/** @returns namespace가 chattings인 곳에 username데이터를 new_user라는 이벤트로 emit */
const helloUser = () => {
	const username = prompt('이름을 입력해주세요!');
	socket.emit('new_user', username, (data) => {
		drawHelloStranger(data);
	});
};

const init = () => {
	helloUser();

	/** @description 이벤트 연결 */
	chatFormElement.addEventListener('submit', onSubmitChatForm);
};

init();
