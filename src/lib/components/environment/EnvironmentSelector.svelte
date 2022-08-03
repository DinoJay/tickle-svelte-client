<script>
	import { afterUpdate } from 'svelte';
	import { store } from '/src/stores/index';
	import ShowEnv from './Environment.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';

	export let selectedEnvironment = '';
	export let isOpen = false;
	export let isMandatory = false;

	const elems = $store.envs.map(() => null);
	afterUpdate(() => {
		const i = $store.envs.findIndex((c) => c.id === selectedEnvironment);
		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
	});
</script>

<LightBox {isOpen} close={() => (isOpen = false)} {isMandatory}>
	<div class="flex flex-col p-4 max-h-[600px] max-w-[500px] h-screen w-screen">
		<h2 class="text-3xl mb-1 text-c-black">Welcome to TICKLE!</h2>

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
