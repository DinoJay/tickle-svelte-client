<script>
	import PreviewCard from '$lib/PreviewCard.svelte';

	export let cards;
	console.log('cards', cards);

	$: previewCardData = cards.map((c) => ({
		id: c.id,
		title: c.title?.value,
		img: c.img?.value?.url
	}));
</script>

<div class="flex overflow-x-auto">
	{#each previewCardData as c}
		<div class="mr-3 shrink-0 grow-0">
			<PreviewCard {...c} />
		</div>
	{/each}
</div>
