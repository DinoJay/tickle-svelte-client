<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { createUserWithEmailAndPassword, EmailAuthCredential } from 'firebase/auth';

	let email = null;
	let pwd = null;

	const submit = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, pwd)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};
</script>

<form action="" method="post" on:submit={(e) => submit(e)}>
	<label for="email">Email address</label>
	<input bind:value={email} type="text" id="email" />
	<label for="password">Password</label>
	<input bind:value={pwd} type="password" id="password" />

	<button type="submit">Sign up</button>
</form>

<style>
</style>
