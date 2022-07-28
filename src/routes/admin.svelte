<script>
	import Panel from '$lib/components/admin/Panel.svelte';
	import Environments from '$lib/components/admin/environments/Environments.svelte';
	import Topics from '$lib/components/admin/topics/Topics.svelte';
	import Cards from '$lib/components/admin/cards/Cards.svelte';
	import Map from '$lib/components/admin/map/Map.svelte';

	/**
	 * selectedEnvironment - The current environment selected in the admin page
	 * selectedCard - The current card selected from an envrionment
	 */
	let selectedEnvironment = null;
	let selectedCard = null;
</script>

<div
	class="grid grid-cols-1 gap-2
        lg:grid-cols-2"
>
	<Panel title={'Environments'}>
		<Environments bind:selectedEnvironment footerContent={'Add new environment'} />
	</Panel>

	<Panel title={'Topics'} {selectedEnvironment}>
		<Topics {selectedEnvironment} footerContent={'Add new topic'} />
	</Panel>

	<Panel title={'Cards'} {selectedEnvironment}>
		<Cards {selectedEnvironment} bind:selectedCard footerContent={'Add new card'} />
	</Panel>

	<Panel title={'Map'} selectedEnvironment={selectedCard}>
		<Map {selectedEnvironment} {selectedCard} />
	</Panel>
</div>
