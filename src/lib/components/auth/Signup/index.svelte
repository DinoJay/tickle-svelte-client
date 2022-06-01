<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();
	const errors = {
		'auth/email-already-in-use': 'The email address is already in use by another account.',
		'auth/admin-restricted-operation': 'This operation is restricted to administrators only.',
		'auth/invalid-email': 'The email address is badly formatted.',
		'auth/weak-password': 'Password should be at least 6 characters.',
		'auth/password-confirmation': 'Passwords do not match.',
		'auth/internal-error': 'An internal error has occurred.'
	};
	let email = '';
	let pwd = '';
	let pwdConfirmation = '';

	const submit = (e) => {
		e.preventDefault();
		if (passwordIsValid()) {
			signUpUser();
		} else {
			createNewNotification(errors['auth/password-confirmation']);
		}
	};

	const passwordIsValid = () => {
		return pwd === pwdConfirmation;
	};

	const signUpUser = () => {
		createUserWithEmailAndPassword(auth, email.trim(), pwd)
			.then((userCredential) => {
				const user = userCredential.user;
				// TODO: Redirection
			})
			.catch((error) => {
				createNewNotification(errors[error.code]);
			});
	};

	const createNewNotification = (message) => {
		addNotification({
			text: message,
			position: 'top-right',
			removeAfter: 3000,
			type: 'warning'
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

<style>
</style>
