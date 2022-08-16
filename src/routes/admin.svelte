<script>
	import Panel from '$lib/components/admin/Panel.svelte';
	import Environments from '$lib/components/admin/environments/Environments.svelte';
	import Topics from '$lib/components/admin/topics/Topics.svelte';
	import Cards from '$lib/components/admin/cards/Cards.svelte';
	import Map from '$lib/components/admin/map/Map.svelte';
	import GeoCatchingValidation from '$lib/components/admin/geoCatching/GeoCatchingValidation.svelte';

	// uploads images : https://svelte.dev/repl/b17c13d4f1bb40799ccf09e0841ddd90?version=3.49.0

	/**
	 * selectedEnvironment - The current environment selected in the admin page
	 * selectedCard - The current card selected from an envrionment
	 */
	let selectedEnvironment = null;
	let selectedCard = null;
</script>

<div
	class="grid grid-cols-1 gap-3 m-2
        lg:grid-cols-2 lg:m-5"
>
	<Panel title={'Environments'}>
		<Environments bind:selectedEnvironment addButtonContent={'Add new environment'} />
	</Panel>

	<Panel title={'Topics'} {selectedEnvironment}>
		<Topics {selectedEnvironment} addButtonContent={'Add new topic'} />
	</Panel>

	<Panel title={'Cards'} {selectedEnvironment}>
		<Cards {selectedEnvironment} bind:selectedCard addButtonContent={'Add new card'} />
	</Panel>

	<Panel title={'Map'} selectedEnvironment={selectedCard}>
		<Map {selectedEnvironment} {selectedCard} />
	</Panel>

	<Panel title={'GeoCatching'}>
		<GeoCatchingValidation />
	</Panel>
</div>
