<script>
	import CellphoneMarker from 'svelte-material-icons/CellphoneMarker.svelte';
	import { store } from '/src/stores/index';

	let errorMessage = 'Please make sure to turn on your geolocation';
</script>

{#if $store.currentUser.location != undefined}
	<slot />
{:else}
	<div class="m-auto">
		<span class="flex justify-center">
			<CellphoneMarker size={120} />
		</span>
		{errorMessage}
	</div>
{/if}
