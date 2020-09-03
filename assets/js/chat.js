const valueMessage = $('#valMess');
const sendMessage = $('#sendMess');
const profile = JSON.parse(localStorage.getItem('user-profile'));

var keyuped = valueMessage.on('keyup', checkMessage)
var clicked = sendMessage.on('click', checkMessage)

firebase.database().ref('chat').on('child_added', function (snapshot){

	var chat = snapshot.val();
	if(chat.fullname == profile.fullname) {
		$('.chat__body').append(meChat(snapshot.key,chat));
	}else{
		$('.chat__body').append(notmeChat(snapshot.key,chat));
	}
})

function checkMessage(event) {

	getMessage = valueMessage.val().trim();
	getMessageLength = valueMessage.val().trim().length;

	// If value null
	if(getMessageLength >= 1) {
		sendMessage.addClass('allowed');
	}else {
		sendMessage.removeClass('allowed');
	}

	// If user keyup
	if(event.type == 'keyup') {
		// Enter to send suport
		if(event.keyCode === 13) {
			firebase.database().ref('chat').push().set({
				fullname: profile.fullname,
				photoUrl: profile.photoUrl,
				message: getMessage
			})
			valueMessage.val('');
			sendMessage.removeClass('allowed');
		}
	}

	// If user click
	if(event.type == 'click') {
		firebase.database().ref('chat').push().set({
			fullname: profile.fullname,
			photoUrl: profile.photoUrl,
			message: getMessage
		})
		valueMessage.val('');
		sendMessage.removeClass('allowed');
	}
}

function meChat(snapshotKey,chat) {
	return `
		<li class="me">
			<div class="chat-content" data-id="${snapshotKey}" id="message-${snapshotKey}">
				<div class="c-mess">${chat.message}</div>
			</div>
		</li>
	`;
}

function notmeChat(snapshotKey,chat) {
	return `
		<li class="him">
			<img src="${chat.photoUrl}" alt="Avatar">
			<div class="chat-content" data-id="${snapshotKey}">
				<div class="c-name">${chat.fullname}</div>
				<div class="c-mess">${chat.message}</div>
			</div>
		</li>
	`;
}