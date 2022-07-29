<script>
	import PreviewCard from '$lib/PreviewCard.svelte';
	import LightBox from './LightBox.svelte';
	import { afterUpdate } from 'svelte';
	import Card from '$lib/components/Card/index.svelte';

	export let selectedCard;

	export let cards;
	export let onClick;
	export let selectedEnvironment;

	console.log(cards);

	$: previewCardData = cards.map((c) => ({
		id: c.id,
		title: c.title?.value,
		img: c.img?.value?.url,
		alt: c.img?.value?.name
	}));

	const getCardProps = (c) => ({
		title: c.title?.value,
		img: c.img?.value?.url,
		description: c.description?.value,
		activity: c?.activity,
		id: c?.id,
		envId: selectedEnvironment
	});

	const elems = cards.map(() => null);
	let modalOpen = false;

	afterUpdate(() => {
		const i = cards.findIndex((c) => c.id === selectedCard);

		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
	});
</script>

<div class="flex overflow-x-auto h-auto p-5 z-10">
	{#each previewCardData as c, i}
		<div
			class="mr-3 shrink-0 grow-0 transition"
			style="transform:scale({c.id === selectedCard ? '1.10' : '1'})"
			bind:this={elems[i]}
			on:click={(e) => {
				if (selectedCard === c.id) modalOpen = true;
				onClick(c.id);
			}}
		>
			<PreviewCard {...c} />
		</div>
	{/each}
	<LightBox isOpen={modalOpen} close={() => (modalOpen = false)}>
		<Card {...getCardProps(cards.find((c) => c.id === selectedCard))} />
	</LightBox>
</div>
