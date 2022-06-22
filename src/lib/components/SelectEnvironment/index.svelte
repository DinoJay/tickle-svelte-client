<script>
	import LightBox from '$lib/LightBox.svelte';
	import { store, loadCardEnvironments } from '/src/stores/index';
	import ShowEnv from './ShowEnv.svelte';
	import { afterUpdate } from 'svelte';
	import TickleWobble from '../TickleWobble.svelte';

	export let envId;
	export let open;
	export let mandatory;

	loadCardEnvironments();

	const elems = $store.envs.map(() => null);
	afterUpdate(() => {
		const i = $store.envs.findIndex((c) => c.id === envId);
		console.log('elems', elems);

		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
	});
</script>

<LightBox {open} close={() => (open = false)} {mandatory}>
	<div class="p-4 cont flex flex-col ">
		<h2 class="text-3xl mb-1 text-gray-800">Welcome to TICKLE!</h2>

		<div class="grow overflow-y-auto">
			{#each $store.envs as env, i}
				<ShowEnv {...env} openId={envId} bind:el={elems[i]} onClick={(id) => (envId = id)} />
			{:else}
				<TickleWobble />
			{/each}
		</div>
	</div>
</LightBox>

<style>
	.cont {
		width: 98vw;
		max-width: 500px;
		height: 98vh;
		max-height: 600px;
	}
</style>
