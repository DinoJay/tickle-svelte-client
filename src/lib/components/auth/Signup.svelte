<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, setDoc } from 'firebase/firestore';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { addNotification } from '/src/stores/notificationStore';
	import AvatarManager from '$lib/components/avatarManager/AvatarSelector.svelte';

	const errors = {
		'auth/email-already-in-use': 'The email address is already in use by another account.',
		'auth/admin-restricted-operation': 'This operation is restricted to administrators only.',
		'auth/invalid-email': 'The email address is badly formatted.',
		'auth/weak-password': 'Password should be at least 6 characters.',
		'auth/password-confirmation': 'Passwords do not match.',
		'auth/internal-error': 'An internal error has occurred.',
		'auth/avatar': 'You must choose an avatar'
	};
	let email = '';
	let pwd = '';
	let pwdConfirmation = '';
	let userAvatar = null;

	/**
	 * Sign up the user if all the information are correct
	 * @param e - event
	 */
	const submit = (e) => {
		e.preventDefault();
		if (!passwordIsValid()) {
			addNotification({ text: errors['auth/password-confirmation'] });
			return;
		}
		if (!userAvatar) {
			addNotification({ text: errors['auth/avatar'] });
			return;
		}
		signUpUser();
	};

	/**
	 * Sign up the user in Firestore - redirect the user to the card view page
	 */
	const signUpUser = () => {
		createUserWithEmailAndPassword(auth, email.trim(), pwd)
			.then((data) => {
				setDoc(doc(db, 'users', data.user.uid), { avatar: userAvatar, email: email }).then(() =>
					goto('/CardView/env/undefined')
				);
			})
			.catch((error) => {
				addNotification({ text: errors[error.code] });
			});
	};

	/**
	 * Verify if the password and the password validation match
	 */
	const passwordIsValid = () => {
		return pwd === pwdConfirmation;
	};
</script>

<div class="flex flex-col h-[calc(100vh-4rem)]">
	<span class="translate-anim-container my-auto">
		<img src="/tickle.svg" alt="tickle-logo" class="w-1/5 m-auto translate-anim" />
	</span>

	<form class="flex flex-col my-auto" action="" method="post" on:submit={(e) => submit(e)}>
		<input
			class="w-[90%] lg:w-2/5 m-auto py-2 px-3 mb-3
				outline-c-dark-gray
				border-black border-2 custom-shadow"
			bind:value={email}
			type="text"
			id="email"
			placeholder="Email Address"
		/>
		<input
			class="w-[90%] lg:w-2/5 m-auto py-2 px-3 mb-3
				outline-c-dark-gray
				border-black border-2 custom-shadow"
			bind:value={pwd}
			type="password"
			id="password"
			placeholder="Choose password"
		/>
		<input
			class="w-[90%] lg:w-2/5 m-auto py-2 px-3 mb-3
				outline-c-dark-gray
				border-black border-2 custom-shadow"
			bind:value={pwdConfirmation}
			type="password"
			id="passwordConfirmation"
			placeholder="Confirm password"
		/>

		<div class="w-auto mx-auto my-4">
			<AvatarManager bind:newUserAvatar={userAvatar} currentUserAvatar={null} />
		</div>

		<button
			class="w-[90%] lg:w-2/5 m-auto mb-1 px-3 py-3 
				font-bold uppercase btn 
			 	border-2 border-black custom-shadow 
				bg-white hover:bg-c-light-gray"
			type="submit">Sign up</button
		>
		<p class="mx-auto">
			Already have an account ?
			<a href="/" class="underline">Sign In</a>
		</p>
	</form>
</div>

<style>
	.custom-shadow {
		box-shadow: 5px 5px 5px #a6a29f;
	}
</style>
