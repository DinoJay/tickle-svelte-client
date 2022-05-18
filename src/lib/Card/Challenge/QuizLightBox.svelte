<script>
	import { portal } from '$lib/portalAction';
	import { fade, slide, fly, blur } from 'svelte/transition';
	import Quiz from './Quiz.svelte';
	export let cards;
	export let start;
	export let style;
	export let className;
	export let alt;
	export let open = false;
	export let close;
	export let activity;

	const getQuizProps = () => ({
		datum: activity,
		width: $$props.width,
		height: $$props.height
	});
</script>

{#if open}
	<div
		transition:blur
		use:portal={'quizModal'}
		class="fixed modal cont w-full h-full flex "
		on:click={(e) => {
			console.log('click', e);
			e.stopPropagation();
			close();
		}}
	>
		<div class="m-auto overflow-hidden" on:click={(e) => e.stopPropagation()}>
			<Quiz {...getQuizProps()} />
		</div>
	</div>
{/if}

<style>
	.modal {
		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);
	}
	.cont {
		background: rgba(240, 248, 255, 0.86);
	}
</style>
