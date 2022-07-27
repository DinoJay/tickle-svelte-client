<script>
	import CardViewPage from '$lib/pages/cardView/CardView.svelte';
	import { page } from '$app/stores';
	import LoadEnvironments from '$lib/components/utils/LoadEnvironments.svelte';
	import LoadCards from '$lib/components/utils/LoadCards.svelte';
	import ListenUserLocation from '$lib/components/geoLocation/ListenUserLocation.svelte';

	$: environmentId = $page.params.envId;
</script>

<ListenUserLocation>
	<LoadEnvironments>
		<LoadCards {environmentId} />
		<CardViewPage selectedEnvironment={environmentId} />
	</LoadEnvironments>
</ListenUserLocation>
