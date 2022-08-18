<script>
	import { onMount } from 'svelte';
	import { store } from '/src/stores/index';
	import { auth, db } from '$lib/firebaseConfig/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { doc, getDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	let allowedNavigation = ['/', '/register-user'];

	/**
	 * Listener on the user auth state
	 * If the user is not in the store, we update the store
	 * If the user is not defined, he can only acces to the pages in the array : allowedNavigation
	 */
	onMount(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				localStorage.clear();
				store.update((obj) => ({ ...obj, currentUser: null }));
				if (!allowedNavigation.includes(window?.location?.pathname)) goto('/');
				return;
			}
			if (!$store?.currentUser) {
				loadUser(currentUser);
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
				if (doc.data()?.admin) userObj.admin = true;
				store.update((obj) => ({ ...obj, currentUser: userObj }));
			});
		};
	});
</script>

<slot />
