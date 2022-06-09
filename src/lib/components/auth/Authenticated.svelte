<script>
	import { store } from '/src/store';
	import Loader from '$lib/components/Loader.svelte';

	export let error;

	let listener = false;
	let authenticated = false;

	const someFunction = (storeObj) => {
		console.log(storeObj);
	};

	store.subscribe((storeObj) => {
		someFunction(storeObj);
	});
</script>

{#if !listener}
	<Loader />
{:else if authenticated}
	<slot />
{:else if error}
	<div>{error}</div>
{/if}
