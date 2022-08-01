<script>
	import { loadCards } from '/src/stores/index';

	export let environmentId = 'undefined';

	$: if (environmentId != 'undefined') {
		loadCards(environmentId);
	}
</script>

<slot />
