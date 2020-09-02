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
// Ref Firebase
var ref = firebase.database().ref("chat");

if(localStorage.getItem('username') === null) {
	$('.popup').addClass('show');
}else{
	$('.welcome-u').html(localStorage.getItem('username'));
	$('.popup .popup__setName .popup-head i').fadeIn();
}
// Edit name click
$('.edit-name').on('click', function (){
	$('#valueName').val(localStorage.getItem('username'));
	$('.popup').addClass('show');
})
// Close edit name click
$('.popup .popup__setName .popup-head i').on('click', function (){
	$('.popup').removeClass('show');
})
// Use enter change name
$('#valueName').on('keyup', function (event){
	if(event.keyCode === 13) {
		var valueName = $(this).val().trim();
		checkName(valueName);
	}
})
// Set name first
$('#setName').on('click', function (event){
	var valueName = $('#valueName').val().trim();
	checkName(valueName);
})
// Send mess
$('#sendMess').on('click', function (e) {
    var valueMess = $('#valueMess').val().trim();
    checkMess(valueMess);
    e.preventDefault();
});
$('#valueMess').on('keyup', function (event){
	if(event.keyCode === 13) {
		var valueMess = $(this).val().trim();
		checkMess(valueMess);
	}
})
function checkName(valueName) {
	if(valueName == '') {
		$('#valueName').addClass('error');
		$('.error').addClass('show');
	}else{
		$('#valueName').val('');
		$('.welcome-u').html(valueName);
		$('.popup').removeClass('show');
		localStorage.setItem('username', valueName);
	}
}
function checkMess(valueMess) {
	var name = localStorage.getItem('username');
    var idMess = random(8) + '-' + random(4) + '-' + random(20);
    firebase.database().ref('chat/' + idMess).set({
        name: name,
        mess: valueMess
    })
    $('#valueMess').val('');
}
ref.on('child_added', function (snapshot){
	var message = snapshot.val();
	if(message.name == localStorage.getItem('username')) {
		var html =` <div class="chat__box--content you">
						<div class="c-name"><b>${message.name}</b></div>
						<div class="c-mess">${message.mess}</div>
					</div>`;
	}else{
		var html =` <div class="chat__box--content">
			<div class="c-name"><b>${message.name}</b></div>
			<div class="c-mess">${message.mess}</div>
		</div>`;
	}
	$('.chat__box').append(html);
	$('.chat__box').animate({
        scrollTop: $('.chat__box')[0].scrollHeight
    }, 100);
})
// Random string
function random(length) {
   var result           = '';
   var characters       = '1234567890';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}