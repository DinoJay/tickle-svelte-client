<script>
	import ImgMarker from '$lib/components/Map/ImgMarker.svelte';
	import Map from '$lib/components/Map/index.svelte';
	import MapMarker from '$lib/components/Map/MapMarker.svelte';
	import Recenter from '$lib/components/Map/Recenter.svelte';
	import TickleWobble from '$lib/components/TickleWobble.svelte';
	import { store } from '/src/stores/index';

	export let data;
	export let onClick;
	export let center;
	let userAvatar = $store.currentUser.avatar;

	$: userLoc = $store.currentUser.location;
</script>

{#if userLoc}
	<Map lat={center[0]} lon={center[1]} zoom={13}>
		{#each data as card}
			<MapMarker
				onClick={() => onClick(card.id)}
				lat={card.loc.value.latitude}
				lon={card.loc.value.longitude}
				label={card.title.value}
			/>
		{/each}
		<ImgMarker {...userLoc} {userAvatar} />
		<Recenter {...userLoc} {userAvatar} />
	</Map>
{:else}
	<TickleWobble />
{/if}
