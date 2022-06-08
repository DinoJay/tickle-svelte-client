<script>
	import { auth } from '$lib/firebaseConfig/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import Loader from '$lib/components/Loader.svelte';

	export let error;

	let listener = false;
	let authenticated = false;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			authenticated = true;
		} else {
			authenticated = false;
		}
		listener = true;
	});
</script>

{#if !listener}
	<Loader />
{:else if authenticated}
	<slot />
{:else if error}
	<div>{error}</div>
{/if}
