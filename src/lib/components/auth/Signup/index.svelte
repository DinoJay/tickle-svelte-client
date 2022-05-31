<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { createUserWithEmailAndPassword } from 'firebase/auth';

	const errors = {
		'auth/email-already-in-use': 'The email address is already in use by another account.',
		'auth/admin-restricted-operation': 'This operation is restricted to administrators only.',
		'auth/invalid-email': 'The email address is badly formatted.',
		'auth/weak-password': 'Password should be at least 6 characters.',
		'auth/password-confirmation': 'Passwords do not match.'
	};
	let email = null;
	let pwd = null;
	let pwdConfirmation = null;
	let feedback = '';

	const submit = (e) => {
		e.preventDefault();
		if (passwordIsValid()) {
			signUpUser();
		} else {
			feedback = errors['auth/password-confirmation'];
		}
	};

	const passwordIsValid = () => {
		return pwd === pwdConfirmation;
	};

	const signUpUser = () => {
		createUserWithEmailAndPassword(auth, email, pwd)
			.then((userCredential) => {
				const user = userCredential.user;
				feedback = 'Account created';
			})
			.catch((error) => {
				const errorCode = error.code;
				feedback = errors[errorCode];
			});
	};
</script>

<form class="flex flex-col justify-center" action="" method="post" on:submit={(e) => submit(e)}>
	<label for="email">Email address</label>
	<input class="mb-6" bind:value={email} type="text" id="email" />
	<label for="password">Choose password</label>
	<input class="mb-6" bind:value={pwd} type="password" id="password" />
	<label for="passwordConfirmation"> Confirm password</label>
	<input class="mb-6" bind:value={pwdConfirmation} type="password" id="passwordConfirmation" />

	<button type="submit">Sign up</button>
</form>
<div>
	<p>{feedback}</p>
</div>

<style>
</style>
