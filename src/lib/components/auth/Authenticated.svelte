<script>
	import { store } from '/src/stores/index';
	import TickleWobble from '$lib/components/TickleWobble.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc } from 'firebase/firestore';

	$: if ($store.currentUser === null) window.location.href = '/';

	onMount(() => {
		onAuthStateChanged(auth, (currentUser) => {
			store.update((obj) => ({ ...obj, currentUser }));

			// if (!$store.currentUser.avatar) {
			// 	storeUserAvatar(currentUser);
			// }
		});
	});

	// const storeUserAvatar = (user) => {
	// 	getDoc(doc(db, 'users', user?.uid)).then((doc) => {
	// 		user.avatar = doc.data().avatar;
	// 		store.update((obj) => ({ ...obj, currentUser: user }));
	// 	});
	// };
</script>

{#if $store.currentUser}
	<slot />
{:else}
	<TickleWobble />
{/if}
