<script>
	import CardViewPage from '$lib/pages/CardViewPage/index.svelte';
	import { page } from '$app/stores';

	$: envId = $page.params.envId;
</script>

<CardViewPage {envId} />
