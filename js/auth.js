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

	// Sign in with Facebook accout
	btnSignInWithFB.on('click', function signInWithFacebook(){
		// new Firebase auth
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider)
				.then(result => {
					console.log(result);
					console.log('Login fb');
				})
				.catch(err => { console.log(err); });
	})

	// Sign in with GOOGLE accout
	btnSignInWithGG.on('click', function signInWithGoogle(){
		// new Firebase auth
		var provider = new firebase.auth.GoogleAuthProvider();
		// open popup login
		firebase.auth().signInWithPopup(provider).catch(err => { console.log(err); });
	})

	// Sign out all account
	btnSignOut.on('click', function signOutAuth(){
		firebase.auth() .signOut() .then(() => {
			// create obj
			var profile = {
				'uid': '',
				'email': '',
				'photoUrl': '',
				'fullname': '',
				// 'emailVerified': user.emailVerified
			}
			// add obj to json
			localStorage.setItem('user-profile', JSON.stringify(profile));
			// redirect to login
			if(lastPathname == 'chat.html') {
				window.location.href = 'index.html';
			}
		})
	})

	firebase.auth().onAuthStateChanged(user => {
		if(user) {
			// create obj
			var profile = {
				'uid': user.uid,
				'email': user.email,
				'photoUrl': user.photoURL,
				'fullname': user.displayName,
				// 'emailVerified': user.emailVerified
			}
			// add obj to json
			localStorage.setItem('user-profile', JSON.stringify(profile));
			// redirect to chat
			if(lastPathname == 'index.html' || lastPathname == '') {

				window.location.href = 'chat.html';

			}
		}
	})
})