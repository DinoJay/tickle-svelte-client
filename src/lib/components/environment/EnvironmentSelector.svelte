<script>
	import LightBox from '$lib/LightBox.svelte';
	import { store } from '/src/stores/index';
	import ShowEnv from './Environment.svelte';
	import { afterUpdate } from 'svelte';

	/**
	 * selectedEnvironment - the id of the selected envrionment
	 * isOpen - true to open the lightbox
	 * isMandatory - true to force the lightbox to open
	 */
	export let selectedEnvironment = null;
	export let isOpen = false;
	export let isMandatory = false;

	const elems = $store.envs.map(() => null);
	afterUpdate(() => {
		const i = $store.envs.findIndex((c) => c.id === selectedEnvironment);
		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
	});
</script>

<LightBox {isOpen} close={() => (isOpen = false)} {isMandatory}>
	<div class="p-4 cont flex flex-col ">
		<h2 class="text-3xl mb-1 text-gray-800">Welcome to TICKLE!</h2>

		<div class="grow overflow-y-auto">
			{#each $store.envs as env}
				<ShowEnv
					{...env}
					openEnv={selectedEnvironment}
					onClick={(id) => (selectedEnvironment = id)}
				/>
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
