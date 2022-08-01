<script>
	import { loadCards } from '/src/stores/index';

	export let environmentId = 'undefined';

	$: if (environmentId != 'undefined' && environmentId) {
		loadCards(environmentId);
	}
</script>

<slot />
