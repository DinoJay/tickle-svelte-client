<script>
	import { page } from '$app/stores';
	import LoadEnvironments from '$lib/components/utils/LoadEnvironments.svelte';
	import LoadCards from '$lib/components/utils/LoadCards.svelte';
	import CardViewPage from '$lib/components/cardView/CardView.svelte';

	$: environmentId = $page.params.environmentId;
</script>

<LoadEnvironments>
	<LoadCards {environmentId} />
	<CardViewPage selectedEnvironment={environmentId} />
</LoadEnvironments>
