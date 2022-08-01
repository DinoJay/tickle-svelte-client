<script>
	import DisplayCards from './DisplayCards.svelte';
	import EnvironmentSelector from './EnvironmentSelector.svelte';

	export let selectedEnvironment = 'default';
	export let environments = {};
	export let userCardsIdForEachEnv = {};
</script>

<div class="text-center w-full h-full">
	<EnvironmentSelector bind:selectedEnvironment bind:userCardsIdForEachEnv bind:environments />
	<DisplayCards {selectedEnvironment} {userCardsIdForEachEnv} />
</div>
