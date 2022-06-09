<script>
	import { store } from '/src/store';
	import Loader from '$lib/components/Loader.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebaseConfig/firebase';

	export let error;

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
	<Loader />
{/if}
