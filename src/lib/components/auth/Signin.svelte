<script>
	import { goto } from '$app/navigation';

	import { auth } from '$lib/firebaseConfig/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { addNotification } from '/src/stores/notificationStore';

	const errors = {
		'auth/invalid-email': 'The email address is badly formatted.',
		'auth/user-not-found': 'There is no user record corresponding to this identifier.',
		'auth/wrong-password': 'The password is invalid or the user does not have a password.',
		'auth/internal-error': 'An internal error has occurred.'
	};
	let email = '';
	let pwd = '';

	/**
	 * Sign in the user if all the information are correct
	 * @param e - event
	 */
	const submit = (e) => {
		e.preventDefault();
		signInUser();
	};

	/**
	 * Sign in the user - redirect the user to the card view page
	 */
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

<div class="flex flex-col h-[calc(100vh-4rem)]">
	<span class="translate-anim-container my-auto">
		<img src="/tickle.svg" alt="tickle-logo" class="translate-anim w-1/4 m-auto" />
	</span>

	<form class="flex flex-col my-auto" action="" method="post" on:submit={(e) => submit(e)}>
		<input
			class="w-[90%] lg:w-2/5 m-auto py-2 px-3 mb-3
				outline-teal-500 text-grey-700 border-black border-2 shadow"
			bind:value={email}
			type="text"
			id="email"
			placeholder="Email Address"
		/>
		<input
			class="w-[90%] lg:w-2/5 m-auto py-2 px-3 mb-3
				outline-teal-500 text-grey-700 border-black border-2 shadow"
			bind:value={pwd}
			type="password"
			id="password"
			placeholder="Password"
		/>

		<button
			class="w-[90%] lg:w-2/5 m-auto mb-1
				uppercase btn px-3 py-3 font-bold border-2 border-black shadow "
			type="submit">Sign in</button
		>
		<p class="mx-auto">
			Do not have an account ?
			<a href="/register-user" class="underline">Sign Up</a>
		</p>
	</form>
</div>
