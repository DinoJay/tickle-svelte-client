<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { addNotification } from '/src/stores/notificationStore';
	import { goto } from '$app/navigation';

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
				goto('/CardView/env/undefined');
			})
			.catch((error) => {
				addNotification({ text: errors[error.code] });
			});
	};
</script>

<div class="grow flex flex-col">
	<img src="/tickle.svg" alt="tickle-logo" class=" grow  px-20 sm:px-0 lg:mt-20  m-auto" />
	<form class="flex flex-col justify-center" action="" method="post" on:submit={(e) => submit(e)}>
		<input
			class="w-full sm:w-2/5 m-auto outline-teal-500 text-grey-700 border-black border-2 py-2 px-3 mb-3 sm:mt-10"
			bind:value={email}
			type="text"
			id="email"
			placeholder="Email Address"
		/>
		<input
			class=" w-full sm:w-2/5 m-auto outline-teal-500 text-grey-700 border-black border-2 py-2 px-3 mb-3"
			bind:value={pwd}
			type="password"
			id="password"
			placeholder="Password"
		/>

		<button
			class="w-full sm:w-2/5 m-auto uppercase btn px-3 py-3 font-bold border-2 border-black mb-1"
			type="submit">Sign in</button
		>
	</form>
	<p class=" m-auto">
		Do not have an account ?
		<a href="/register-user" class="underline">Sign Up</a>
	</p>
</div>

<style>
</style>
