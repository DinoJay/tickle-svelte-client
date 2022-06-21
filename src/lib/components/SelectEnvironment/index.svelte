<script>
	import LightBox from '$lib/LightBox.svelte';
	import { store, loadCardEnvironments } from '/src/stores/index';
	import ShowEnv from './ShowEnv.svelte';
	import { afterUpdate } from 'svelte';
	import TickleWobble from '$lib/components/TickleWobble.svelte';

	export let envId;
	let openId = envId;
	export let open;
	$: envs = $store.envs;

	const elems = $store.envs.map(() => null);
	afterUpdate(() => {
		const i = envs.findIndex((c) => c.id === openId);
		console.log('elems', elems);

		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
	});
</script>

<LightBox {open} close={() => (open = false)}>
	<div class="p-4 cont flex flex-col ">
		<h2 class="text-3xl mb-1 text-gray-800">Welcome to TICKLE!</h2>

		<div class="grow overflow-y-auto">
			{#await loadCardEnvironments()}
				<TickleWobble />
			{:then _}
				{#each $store.envs as env, i}
					<ShowEnv {...env} {openId} bind:el={elems[i]} onClick={(id) => (openId = id)} />
				{/each}
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
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
