<script>
	import Panel from '$lib/components/admin/Panel.svelte';
	import Environments from '$lib/components/admin/environments/Environments.svelte';
	import Topics from '$lib/components/admin/topics/Topics.svelte';

	/**
	 * selectedEnvironment - The current environment selected in the admin page
	 */
	let selectedEnvironment = null;
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

	<Panel title={'Cards'} {selectedEnvironment} />

	<Panel title={'Map'} {selectedEnvironment} />
</div>
