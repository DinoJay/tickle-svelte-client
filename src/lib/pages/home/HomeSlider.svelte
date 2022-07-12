<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import ChangeAvatar from '$lib/pages/home/ChangeAvatar.svelte';

	export let selectedIcon;
	let lastSelectedIcon = 'cards';
	let flyIn = 0;
	let flyOut = 0;
	$: screenWidth = 0;

	/**
	 * Dynamic method to catch the size of the screen
	 */
	onMount(() => {
		console.log('ok');
		screenWidth = window.innerWidth;

		window.addEventListener('resize', () => {
			screenWidth = window.innerWidth;
		});
	});

	$: if (selectedIcon) {
		if (selectedIcon == 'cards') {
			flyIn = screenWidth;
			flyOut = screenWidth;
		}
		if (selectedIcon == 'avatar') {
			flyIn = -screenWidth;
			flyOut = -screenWidth;
		}
		if (selectedIcon == 'friends' && lastSelectedIcon == 'progress') {
			flyIn = -screenWidth;
			flyOut = screenWidth;
		}
		if (selectedIcon == 'progress' && lastSelectedIcon == 'friends') {
			flyIn = screenWidth;
			flyOut = -screenWidth;
		}

		lastSelectedIcon = selectedIcon;
	}
</script>

{#if selectedIcon == 'cards'}
	<div
		in:fly={{ x: -screenWidth, duration: 500, opacity: 1 }}
		out:fly={{ x: -screenWidth, duration: 500, opacity: 1 }}
		class="absolute w-full"
	>
		Cards
	</div>
{:else if selectedIcon == 'friends'}
	<div
		in:fly={{ x: flyIn, duration: 500, opacity: 1 }}
		out:fly={{ x: flyOut, duration: 500, opacity: 1 }}
		class="absolute w-full"
	>
		Friends
	</div>
{:else if selectedIcon == 'progress'}
	<div
		in:fly={{ x: flyIn, duration: 500, opacity: 1 }}
		out:fly={{ x: flyOut, duration: 500, opacity: 1 }}
		class="absolute w-full"
	>
		Progress
	</div>
{:else if selectedIcon == 'avatar'}
	<div transition:fly={{ x: screenWidth, duration: 500, opacity: 1 }} class="absolute w-full">
		<ChangeAvatar />
	</div>
{/if}
