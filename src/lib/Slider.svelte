<script>
	import PreviewCard from '$lib/PreviewCard.svelte';
	import LightBox from './LightBox.svelte';

	export let cards;
	console.log('cards', cards);

	$: previewCardData = cards.map((c) => ({
		id: c.id,
		title: c.title?.value,
		img: c.img?.value?.url
	}));

	const elems = cards.map(() => null);
	let selected = null;
	let modalOpen = false;
</script>

<div class="flex overflow-x-auto overflow-y-visible py-3 px-6 ">
	{#each previewCardData as c, i}
		<div
			class="mr-3 shrink-0 grow-0 transition"
			style="transform:scale({c.id === selected ? '1.10' : '1'})"
			bind:this={elems[i]}
			on:click={(e) => {
				elems[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
				if (selected === c.id) modalOpen = true;
				selected = c.id;
			}}
		>
			<PreviewCard {...c} />
		</div>
	{/each}
	<LightBox
		open={modalOpen}
		close={() => (modalOpen = false)}
		card={cards.find((c) => c.id === selected)}
	/>
</div>
