<script>
	import { portal } from './portalAction';
	import { fade, slide, fly, blur } from 'svelte/transition';
	import Card from '$lib/Card/index.svelte';
	export let cards;
	export let start;
	export let style;
	export let className;
	export let alt;
	export let open = false;
	export let close;
	export let card;

	const getCardProps = (c) => ({
		title: c.title?.value,
		img: c.img?.value?.url,
		description: c.description?.value,
		activity: c.activity
	});
</script>

{#if open}
	<div
		transition:blur
		use:portal={'modals'}
		class="fixed modal cont w-full h-full flex "
		on:click={(e) => {
			console.log('e', e);
			e.stopPropagation();
			close();
		}}
	>
		<div class="m-auto" on:click={(e) => e.stopPropagation()}>
			<Card {...getCardProps(card)} />
		</div>
	</div>
{/if}

<style>
	.modal {
		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);
		@apply z-50;
	}
	.cont {
		background: rgba(240, 248, 255, 0.86);
	}
</style>
