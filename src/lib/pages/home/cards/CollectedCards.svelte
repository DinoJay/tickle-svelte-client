<script>
	import DisplayCards from './DisplayCards.svelte';
	import EnvironmentSelector from './EnvironmentSelector.svelte';

	let selectedEnvironment = 'default';
	let userCardsIdForEachEnv = {};
</script>

<div class="text-center bg-c-light-yellow w-full h-full">
	<EnvironmentSelector bind:selectedEnvironment bind:userCardsIdForEachEnv />
	<DisplayCards {selectedEnvironment} {userCardsIdForEachEnv} />
</div>
