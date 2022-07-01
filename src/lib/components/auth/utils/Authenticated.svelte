<script>
	import { store } from '/src/stores/index';

	let errorMessage = 'Oops you must be logged in to access this page';
</script>

{#if $store.currentUser}
	<slot />
{:else}
	{errorMessage}
{/if}
