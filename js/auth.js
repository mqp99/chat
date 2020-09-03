$(function(){
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
	const btnSignOut = $('.button-sign-out');
	const btnSignInWithGG = $('.button-si-w-gg');
	const btnSignInWithFB = $('.button-si-w-fb');
	const lastPathname = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	$('.open-box').on('click', function () {
		$('.open-box').slideUp();
		$('.auth__box').slideDown();
	})

	btnSignOut.on('click', function signOutAuth(){
		firebase.auth()
			.signOut()
			.then(() => {

				var profile = {
					'uid': '',
					'email': '',
					'photoUrl': '',
					'fullname': '',
					// 'emailVerified': user.emailVerified
				}

				localStorage.setItem('user-profile', JSON.stringify(profile));

				if(lastPathname == 'chat.html') {

					window.location.href = 'index.html';

				}
			})
	})

	btnSignInWithGG.on('click', function signInWithGoogle(){

		var provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth()
			.signInWithPopup(provider)
			.catch(err => {
				console.log(err);
			})
	})

	firebase.auth().onAuthStateChanged(user => {
		if(user) {

			var profile = {
				'uid': user.uid,
				'email': user.email,
				'photoUrl': user.photoURL,
				'fullname': user.displayName,
				// 'emailVerified': user.emailVerified
			}

			localStorage.setItem('user-profile', JSON.stringify(profile));

			if(lastPathname == 'index.html' || lastPathname == '') {

				window.location.href = 'chat.html';

			}
		}
	})
})