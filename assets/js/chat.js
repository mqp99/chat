const valueMessage = $('#valMess');
const sendMessage = $('#sendMess');
const profile = JSON.parse(localStorage.getItem('user-profile'));

var keyuped = valueMessage.on('keyup', checkMessage)
var clicked = sendMessage.on('click', checkMessage)
var delMess = $(document).on('dblclick','.chat-content', deleteMess)

firebase.database().ref('chat').on('child_added', function (snapshot){

	var chat = snapshot.val();
	if(chat.fullname == profile.fullname) {
		$('.chat__body').append(meChat(snapshot.key,chat));
	}else{
		$('.chat__body').append(notmeChat(snapshot.key,chat));
	}
	$('.chat__body').animate({ scrollTop: $('.chat__body')[0].scrollHeight }, 0);
})

firebase.database().ref('chat').on('child_removed', function (snapshot){
	$(`#message-${snapshot.key}`).html('<i>Message has been removed!</i>');
	setTimeout(()=>{$(`#message-${snapshot.key}`).parents('.me').remove()},3000);
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
			sendMess(getMessage);
		}
	}

	// If user click
	if(event.type == 'click') {
		sendMess(getMessage);
	}
}

function sendMess(getMessage) {
	var d = new Date();
	var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
	firebase.database().ref('chat').push().set({
		fullname: profile.fullname,
		photoUrl: profile.photoUrl,
		message: getMessage,
		time: time
	})
	valueMessage.val('');
	sendMessage.removeClass('allowed');
}

function deleteMess() {
	var _chatID = $(this).attr('data-id');
	var _userUID = $(this).attr('data-uid');
	if(_userUID == profile.uid) {
		firebase.database().ref('chat').child(_chatID).remove();
	}
}

function meChat(snapshotKey,chat) {
	return `
		<li class="me">
			<div class="chat-content" data-id="${snapshotKey}" data-uid='${profile.uid}' id="message-${snapshotKey}">
				<div class="c-mess">${chat.message}</div>
			</div>
		</li>
	`;
}

function notmeChat(snapshotKey,chat) {
	return `
		<li class="him">
			<img src="${chat.photoUrl}" alt="Avatar">
			<div class="chat-content" data-id="${snapshotKey}" id="message-${snapshotKey}">
				<div class="c-name">${chat.fullname}</div>
				<div class="c-mess">${chat.message}</div>
				<div class="c-time">${chat.time}</div>
			</div>
		</li>
	`;
}