<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { createUserWithEmailAndPassword } from 'firebase/auth';

	import { addNotification } from '/src/stores/notificationStore';
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
		class="w-3/5 m-auto outline-teal-500 text-grey-700 border-black border-2 py-2 px-3 mb-3"
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
		placeholder="Choose password"
	/>
	<input
		class="w-3/5 m-auto outline-teal-500 text-grey-700 border-black border-2 py-2 px-3 mb-3"
		bind:value={pwdConfirmation}
		type="password"
		id="passwordConfirmation"
		placeholder="Confirm password"
	/>

	<button
		class="w-3/5 m-auto uppercase btn px-3 py-3 font-bold border-2 border-black mb-1"
		type="submit">Sign up</button
	>
</form>
<p class="w-3/5 m-auto">
	Already have an account ?
	<a href="/" class="underline">Sign In</a>
</p>

<style>
</style>
