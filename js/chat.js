const firebaseConfig = {
	apiKey: "AIzaSyCjSPkaazfq0ECJtrjfCY2CtsIqLloG7ks",
	authDomain: "fir-e68f8.firebaseapp.com",
	databaseURL: "https://fir-e68f8.firebaseio.com",
	projectId: "fir-e68f8",
	storageBucket: "fir-e68f8.appspot.com",
	messagingSenderId: "570241805881",
	appId: "1:570241805881:web:51d8c21095f85b6ea727e8",
	measurementId: "G-QGYL626X0M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/**  Get name user chat */

var innerName = $('.welcome-u');

/**  Set name first */

if(localStorage.getItem('username') === null) {
	var nameRan = randomName(10);
	var name = prompt('Tên bạn là gì:', nameRan);
	var name = name.trim();
	if (name == 'null' || name == '' || name === null) {
		localStorage.setItem('username', nameRan);
	}else if (name) {
		localStorage.setItem('username', name);
	}
}

/**  PRESS `name` to change name */

innerName.on('click', function (e) {
	var name = prompt('Bạn muốn đổi tên thành gì:', localStorage.getItem('username')); 
	var name = $.trim(name);
	if (name == 'null' || name == '' || name === null) {
		localStorage.setItem('username', localStorage.getItem('username'));
	}else if (name) {
		localStorage.setItem('username', name);
	}
	innerName.html(localStorage.getItem('username'));
});

/**  ADD DATA IF PRESS `button` */

$(document).on('click','#sendMess', function (e) {
	var name = localStorage.getItem('username');
    var valueMess = $('#valMess').val().trim();
    if(valueMess != '') {
	    firebase.database().ref('chat').push().set({
	        name: name,
	        mess: valueMess
	    })
	    $('#valMess').val('');
	}
    e.preventDefault();
});

/**  ADD DATA IF PRESS `enter` */

$(document).on('keyup','#valMess', function (event){
	var name = localStorage.getItem('username');
	var valueMess = $(this).val().trim();
	var valueLength = valueMess.length;
	if(valueLength >= 1) {
		$('#sendMess').addClass('allowed');
	}else{
		$('#sendMess').removeClass('allowed');
	}
	if(event.keyCode === 13 && valueMess != '') {
	    firebase.database().ref('chat').push().set({
	        name: name,
	        mess: valueMess
	    })
    	$('#sendMess').removeClass('allowed');
    	$('#valMess').val('');
	}
})


$(document).on('click','.chat-content',function() {
	_chatID = $(this).attr('data-id');
	firebase.database().ref('chat').child(_chatID).remove();
})

firebase.database().ref('chat').on('child_removed', function (snapshot){
	$(`#message-${snapshot.key}`).html('<i>Message has been removed!</i>');
})


/**  FETCH DATA ON CHANGE */

firebase.database().ref('chat').on('child_added', function (snapshot){
	var message = snapshot.val();
	if(message.name == localStorage.getItem('username')) {
		var html =` 
			<li class="me">
				<div class="chat-content" data-id="${snapshot.key}" id="message-${snapshot.key}">
					<div class="c-mess">${message.mess}</div>
				</div>
			</li>`;
	}else{
		var html =` 
			<li class="him">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQn6-5fW9aIGRGKn2lwvzYZQs8FQO6hmUD_AA&usqp=CAU" alt="">
				<div class="chat-content" data-id="${snapshot.key}">
					<div class="c-name">${message.name}</div>
					<div class="c-mess">${message.mess}</div>
				</div>
			</li>`;
	}
	$('.chat__body').append(html).animate({ scrollTop: $('.chat__body')[0].scrollHeight }, 0);
})

/**  INNER NAME Eg: Hello: user */

innerName.html(localStorage.getItem('username'));

/** RANDOM NAME */

function randomName(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}