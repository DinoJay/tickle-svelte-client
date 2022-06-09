<script>
	import { portal } from './portalAction';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import { fade, slide, fly, blur } from 'svelte/transition';
	export let style;
	export let className;
	export let alt;
	export let open = false;
	export let close;
</script>

{#if open}
	<div
		transition:blur
		use:portal={'modals'}
		class="fixed modal cont w-full h-full flex drop-shadow-2xl"
		on:click={(e) => {
			console.log('e', e);
			e.stopPropagation();
			close();
		}}
	>
		<div class="m-auto bg-white relative" on:click={(e) => e.stopPropagation()}>
			<button on:click={close} class="absolute right-0 p-3"><WindowClose size="1.5em" /> </button>
			<slot />
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
