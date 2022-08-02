<script>
	import { afterUpdate } from 'svelte';
	import PreviewCard from '$lib/components/cardView/utils/slider/PreviewCard.svelte';
	import LightBox from '$lib/LightBox.svelte';
	import Card from '$lib/components/card/Card.svelte';

	export let cards = [{}];
	export let selectedEnvironment = '';
	export let selectedCard = '';
	export let onClick = () => {};

	$: previewCardData = cards.map((card) => ({
		id: card.id,
		title: card.title?.value,
		img: card.img?.value?.url,
		alt: card.img?.value?.name
	}));

	const getCardProps = (card) => ({
		title: card.title?.value,
		img: card.img?.value?.url,
		description: card.description?.value,
		activity: card?.activity,
		id: card?.id,
		envId: selectedEnvironment
	});
	const elems = cards.map(() => null);
	let openModal = false;

	afterUpdate(() => {
		const i = cards.findIndex((card) => card.id === selectedCard);

		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
	});
</script>

<div class="flex h-auto px-3 py-8 z-10 overflow-x-auto">
	{#each previewCardData as card, i}
		<div
			class="mx-1.5 cursor-pointer
				shrink-0 grow-0 transition"
			style="transform:scale({card.id === selectedCard ? '1.10' : '1'})"
			bind:this={elems[i]}
			on:click={() => {
				if (selectedCard === card.id) openModal = true;
				onClick(card.id);
			}}
		>
			<PreviewCard {...card} />
		</div>
	{/each}
</div>

<LightBox isOpen={openModal} close={() => (openModal = false)}>
	<Card {...getCardProps(cards.find((card) => card.id === selectedCard))} />
</LightBox>
