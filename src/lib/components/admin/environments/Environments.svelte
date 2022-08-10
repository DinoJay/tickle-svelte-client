<script>
	import { loadCardEnvironments, store } from '/src/stores/index';
	import { doc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Environment from './EditEnvironment.svelte';
	import AddButton from '$lib/components/admin/utils/AddButton.svelte';
	import Content from '$lib/components/admin/utils/block/BlockContent.svelte';
	import Block from '$lib/components/admin/utils/block/Block.svelte';

	export let addButtonContent = '';
	export let selectedEnvironment = null;

	loadCardEnvironments();
	let environments = $store.envs;
	let currentEnvironment = {
		id: 'null',
		title: '',
		description: '',
		img: { name: '', url: '' }
	};
	let isLightBoxOpen = false;

	/**
	 * Each times the lightBox is updated we check for new environments
	 */
	$: if (isLightBoxOpen) {
		loadCardEnvironments();
		environments = $store.envs;
	}
</script>

<div class="h-[35rem] overflow-auto">
	{#if $store.envs}
		{#each environments as env}
			<Block
				onClick={() => {
					environments.splice(environments.indexOf(env), 1);
					environments = [...environments];
				}}
				ref={doc(db, 'card-envs', env.id)}
			>
				<Content
					element={env}
					bind:selectedElement={selectedEnvironment}
					bind:currentElement={currentEnvironment}
					bind:isLightBoxOpen
				/>
			</Block>
		{/each}
	{/if}
</div>

<AddButton
	{addButtonContent}
	onClick={() => {
		isLightBoxOpen = true;
		currentEnvironment = {
			id: 'null',
			title: '',
			description: '',
			img: { name: '', url: '' }
		};
	}}
/>

<LightBox isOpen={isLightBoxOpen} close={() => (isLightBoxOpen = false)}>
	<Environment {currentEnvironment} />
</LightBox>
