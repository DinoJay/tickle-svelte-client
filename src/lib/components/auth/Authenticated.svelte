<script>
	import { store } from '/src/stores/index';
	import TickleWobble from '$lib/components/TickleWobble.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebaseConfig/firebase';

	$: if ($store.currentUser === null) window.location.href = '/';

	onMount(() => {
		onAuthStateChanged(auth, (currentUser) => {
			store.update((obj) => ({ ...obj, currentUser }));
		});
	});
</script>

{#if $store.currentUser}
	<slot />
{:else}
	<TickleWobble />
{/if}
