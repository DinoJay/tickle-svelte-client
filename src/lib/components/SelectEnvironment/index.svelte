<script>
	import LightBox from '$lib/LightBox.svelte';
	import { store } from '/src/store';
	import ShowEnv from './ShowEnv.svelte';

	let open = true;
</script>

<LightBox {open} close={() => (open = false)}>
	<div class="p-4 cont flex flex-col ">
		<h2 class="text-3xl mb-1 text-gray-800">Welcome to TICKLE!</h2>

		<div class=" overflow-y-auto">
			{#if $store.envs.length === 0}
				Loading...
			{:else}
				{#each $store.envs as env}
					<ShowEnv {...env} />
				{/each}
			{/if}
		</div>
	</div>
</LightBox>

<style>
	.cont {
		width: 98vw;
		max-width: 500px;
		height: 98vh;
		max-height: 500px;
	}
</style>
