<script>
	import { store, loadCards } from '/src/stores/index';
	export let environmentId = 'undefined';

	$: if (environmentId != 'undefined') {
		loadCards(environmentId);
		store.update((obj) => {
			return { ...obj, selectedEnvId: environmentId };
		});
	}
</script>

<slot />
