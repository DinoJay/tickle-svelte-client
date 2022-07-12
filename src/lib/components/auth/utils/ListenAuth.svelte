<script>
	import { onMount } from 'svelte';
	import { store } from '/src/stores/index';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth, db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	onMount(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				localStorage.clear();
				goto('/');
			} else {
				if (!$store?.currentUser) {
					loadUser(currentUser);
				}
			}
		});

		/**
		 * Load the user from Firestore to the local svelte store
		 * @param user
		 */
		const loadUser = (user) => {
			getDoc(doc(db, 'users', user.uid)).then((doc) => {
				let userObj = {};
				userObj.avatar = doc.data().avatar;
				userObj.uid = user.uid;
				store.update((obj) => ({ ...obj, currentUser: userObj }));
			});
		};
	});
</script>

<slot />
