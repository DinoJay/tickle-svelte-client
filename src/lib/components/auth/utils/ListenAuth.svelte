<script>
	import { onMount } from 'svelte';
	import { store } from '/src/stores/index';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth, db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	onMount(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) goto('/');

			store.update((obj) => ({ ...obj, currentUser }));
			getUserAvatar(currentUser);
		});

		/**
		 * Get the user's avatar from Firestore based on user
		 * @param user
		 */
		const getUserAvatar = (user) => {
			if (!user?.avatar) {
				getDoc(doc(db, 'users', user?.uid)).then((doc) => {
					user.avatar = doc.data().avatar;
					store.update((obj) => ({ ...obj, currentUser: user }));
				});
			}
		};
	});
</script>

<slot />
