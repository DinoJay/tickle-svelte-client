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

<img src="/tickle.svg" alt="tickle-logo" class="w-1/3 mt-20 mb-10 h-auto m-auto" />
<form class="flex flex-col justify-center" action="" method="post" on:submit={(e) => submit(e)}>
	<input
		class="w-3/5 m-auto outline-teal-500 text-grey-700 border-black border-2 py-2 px-3 mb-3 mt-10"
		bind:value={email}
		type="text"
		id="email"
		placeholder="Email Address"
	/>
	<input
		class="w-3/5 m-auto outline-teal-500 text-grey-700 border-black border-2 py-2 px-3 mb-3"
		bind:value={pwd}
		type="password"
		id="password"
		placeholder="Password"
	/>

	<button
		class="w-3/5 m-auto uppercase btn px-3 py-3 font-bold border-2 border-black mb-1"
		type="submit">Sign in</button
	>
</form>
<p class="w-3/5 m-auto">
	Do not have an account ?
	<a href="/register-user" class="underline">Sign Up</a>
</p>

<style>
</style>
