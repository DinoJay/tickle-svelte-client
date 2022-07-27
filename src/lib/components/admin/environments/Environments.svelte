<script>
	import LightBox from '$lib/LightBox.svelte';
	import { loadCardEnvironments, store } from '/src/stores/index';
	import AddButton from '../AddButton.svelte';
	import Environment from './Environment.svelte';
	import { doc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import DeleteButton from '../DeleteButton.svelte';

	// todo create / update env

	/**
	 * footerContent - the content of the button used to add a new element
	 * selectedEnvironment - The current environment ID selected in the admin page
	 * isLightBoxOpen - default : false
	 * currentEnvironment - the current environment OBJECT selected in the admin page
	 */
	export let footerContent = '';
	export let selectedEnvironment = null;

	loadCardEnvironments();
	let environments = $store.envs;
	let currentEnvironment = { id: 'null', name: '' };
	let isLightBoxOpen = false;

	/**
	 * Function to select an environment
	 * Is the environment is already selected it opens the lightBox ti update it
	 * @param envId - the id of the selected environment
	 */
	const selectEnvOrOpenLightBox = (env) => {
		if (selectedEnvironment != env.id) {
			selectedEnvironment = env.id;
		} else {
			isLightBoxOpen = true;
			currentEnvironment = env;
		}
	};

	/**
	 * Each times the selectedEnvironment or the lightBox are updated we check for new environments
	 */
	$: if (selectedEnvironment || isLightBoxOpen) {
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
				<p
					class="flex h-full w-full justify-center items-center
					whitespace-nowrap text-ellipsis cursor-pointer
					{selectedEnvironment == env.id ? 'bg-green-200 hover:bg-green-400' : ' hover:bg-gray-200'}"
					on:click={() => selectEnvOrOpenLightBox(env)}
				>
					{env.name}
				</p>

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
		currentEnvironment = { id: 'null', name: '' };
	}}
/>

<LightBox isOpen={isLightBoxOpen} close={() => (isLightBoxOpen = false)}>
	<Environment {currentEnvironment} />
</LightBox>
