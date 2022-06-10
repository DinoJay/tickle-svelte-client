<script>
	import PreviewCard from '$lib/PreviewCard.svelte';
	import LightBox from './LightBox.svelte';
	import { afterUpdate } from 'svelte';
	import Card from '$lib/Card/index.svelte';

	export let selected;

	export let cards;
	export let onClick;

	$: previewCardData = cards.map((c) => ({
		id: c.id,
		title: c.title?.value,
		img: c.img?.value?.url
	}));

	const getCardProps = (c) => ({
		title: c.title?.value,
		img: c.img?.value?.url,
		description: c.description?.value,
		activity: c.activity
	});

	const elems = cards.map(() => null);
	let modalOpen = false;

	afterUpdate(() => {
		const i = cards.findIndex((c) => c.id === selected);

		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
		console.log('elems', elems, 'i', i, 'el', elems[i]);
	});
</script>

<div class="flex overflow-x-auto overflow-y-visible py-3 px-6 ">
	{#each previewCardData as c, i}
		<div
			class="mr-3 shrink-0 grow-0 transition"
			style="transform:scale({c.id === selected ? '1.10' : '1'})"
			bind:this={elems[i]}
			on:click={(e) => {
				if (selected === c.id) modalOpen = true;
				onClick(c.id);
			}}
		>
			<PreviewCard {...c} />
		</div>
	{/each}
	<LightBox open={modalOpen} close={() => (modalOpen = false)}>
		<Card {...getCardProps(cards.find((c) => c.id === selected))} />
	</LightBox>
</div>
