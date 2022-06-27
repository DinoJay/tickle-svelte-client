<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, setDoc } from 'firebase/firestore';
	import { addNotification } from '/src/stores/notificationStore';
	import AvatarManager from '$lib/components/AvatarManager/index.svelte';

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

	const submit = (e) => {
		e.preventDefault();
		if (!passwordIsValid()) {
			createNewNotification(errors['auth/password-confirmation']);
			return;
		}
		if (!userAvatar) {
			createNewNotification(errors['auth/avatar']);
			return;
		}
		signUpUser();
	};

	const passwordIsValid = () => {
		return pwd === pwdConfirmation;
	};

	const signUpUser = () => {
		createUserWithEmailAndPassword(auth, email.trim(), pwd)
			.then((data) => {
				setDoc(doc(db, 'users', data.user.uid), { avatar: userAvatar, email: email }).then(
					() => (window.location.href = '/CardView/env/undefined')
				);
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

<img src="/tickle.svg" alt="tickle-logo" class=" grow  px-20 sm:px-0 lg:my-10  m-auto" />
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
		class="w-3/5 m-auto outline-teal-500 text-grey-700 border-black border-2 py-2 px-3 mb-1"
		bind:value={pwdConfirmation}
		type="password"
		id="passwordConfirmation"
		placeholder="Confirm password"
	/>

	<div class="flex m-auto justify-center my-4 w-full overflow-auto h-16">
		<AvatarManager bind:userAvatar currentUserAvatar={null} />
	</div>

	<button
		class="w-3/5 m-auto uppercase btn px-3 py-3 font-bold border-2 border-black mb-1"
		type="submit">Sign up</button
	>
</form>
<p class="w-3/5 mx-auto">
	Already have an account ?
	<a href="/" class="underline">Sign In</a>
</p>

<style>
</style>
