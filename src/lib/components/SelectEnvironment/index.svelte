<script>
	import LightBox from '$lib/LightBox.svelte';
	import { store } from '/src/store';
	import ShowEnv from './ShowEnv.svelte';
	import { afterUpdate, tick } from 'svelte';
	import TickleWobble from '$lib/components/TickleWobble.svelte';

	let open = true;
	let openId = null;
	$: envs = $store.envs;
	const elems = $store.envs.map(() => null);
	afterUpdate(async () => {
		const i = envs.findIndex((c) => c.id === openId);
		console.log('elems', elems);

		// await tick();

		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
	});
</script>

<LightBox {open} close={() => (open = false)}>
	<div class="p-4 cont flex flex-col ">
		<h2 class="text-3xl mb-1 text-gray-800">Welcome to TICKLE!</h2>

		<div class="grow overflow-y-auto">
			{#if $store.envs.length === 0}
				<TickleWobble />
			{:else}
				{#each $store.envs as env, i}
					<ShowEnv {...env} {openId} bind:el={elems[i]} onClick={(id) => (openId = id)} />
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
		max-height: 600px;
	}
</style>
