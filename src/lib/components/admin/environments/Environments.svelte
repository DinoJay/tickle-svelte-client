<script>
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import { loadCardEnvironments, store } from '/src/stores/index';
	import AddButton from '../utils/AddButton.svelte';
	import Environment from './EditEnvironment.svelte';
	import { doc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import DeleteButton from '../utils/DeleteButton.svelte';
	import Body from '../utils/PanelBody.svelte';

	export let footerContent = '';
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
	 * Each times the selectedEnvironment or the lightBox are updated we check for new environments
	 */
	$: if (isLightBoxOpen) {
		loadCardEnvironments();
		environments = $store.envs;
	}
</script>

<div class="h-[35rem] overflow-auto">
	{#if $store.envs}
		{#each environments as env}
			<div
				class="flex h-12 w-full
				bg-white my-1"
			>
				<Body
					element={env}
					bind:selectedElement={selectedEnvironment}
					bind:currentElement={currentEnvironment}
					bind:isLightBoxOpen
				/>

				<DeleteButton
					onClick={() => {
						environments.splice(environments.indexOf(env), 1);
						environments = [...environments];
					}}
					ref={doc(db, 'card-envs', env.id)}
				/>
			</div>
		{/each}
	{/if}
</div>

<AddButton
	{footerContent}
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
