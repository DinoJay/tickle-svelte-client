<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	const errors = {
		'auth/invalid-email': 'The email address is badly formatted.',
		'auth/user-not-found': 'There is no user record corresponding to this identifier.',
		'auth/wrong-password': 'The password is invalid or the user does not have a password.'
	};
	let email = null;
	let pwd = null;
	let feedback = '';

	const submit = (e) => {
		e.preventDefault();
		signInUser();
	};

	const signInUser = () => {
		signInWithEmailAndPassword(auth, email, pwd)
			.then((userCredential) => {
				const user = userCredential.user;
				feedback = 'Connected';
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				feedback = errors[errorCode];
			});
	};
</script>

<form action="" method="post" on:submit={(e) => submit(e)}>
	<label for="email">Email address</label>
	<input bind:value={email} type="text" id="email" />
	<label for="password">Password</label>
	<input bind:value={pwd} type="password" id="password" />

	<button type="submit">Sign in</button>
</form>
<div>
	<p>{feedback}</p>
</div>

<style>
</style>
