<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();
	const errors = {
		'auth/invalid-email': 'The email address is badly formatted.',
		'auth/user-not-found': 'There is no user record corresponding to this identifier.',
		'auth/wrong-password': 'The password is invalid or the user does not have a password.',
		'auth/internal-error': 'An internal error has occurred.'
	};
	let email = '';
	let pwd = '';

	const submit = (e) => {
		e.preventDefault();
		signInUser();
	};

	const signInUser = () => {
		signInWithEmailAndPassword(auth, email.trim(), pwd)
			.then(() => {
				window.location.href = '/CardView';
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
	<label for="password">Password</label>
	<input class="mb-6" bind:value={pwd} type="password" id="password" />

	<button type="submit">Sign in</button>
</form>

<style>
</style>
