<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import ChangeAvatar from '$lib/components/home/avatar/ChangeAvatar.svelte';
	import CollectedCards from './cards/CollectedCards.svelte';

	export let selectedIcon;
	let lastSelectedIcon = 'cards';
	let flyIn = 0;
	let flyOut = 0;
	$: screenWidth = 0;

	// CollectedCards
	let selectedEnvironment = 'default';
	let userCardsIdForEachEnv = {};
	let environments = {};

	/**
	 * Dynamic method to catch the size of the screen
	 */
	onMount(() => {
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
		class="absolute w-full h-[calc(100vh-10rem)]"
	>
		<CollectedCards bind:selectedEnvironment bind:userCardsIdForEachEnv bind:environments />
	</div>
{:else if selectedIcon == 'friends'}
	<div
		in:fly={{ x: flyIn, duration: 500, opacity: 1 }}
		out:fly={{ x: flyOut, duration: 500, opacity: 1 }}
		class="absolute w-full h-[calc(100vh-10rem)] bg-yellow-50"
	/>
{:else if selectedIcon == 'progress'}
	<div
		in:fly={{ x: flyIn, duration: 500, opacity: 1 }}
		out:fly={{ x: flyOut, duration: 500, opacity: 1 }}
		class="absolute w-full h-[calc(100vh-10rem)] bg-yellow-50"
	/>
{:else if selectedIcon == 'avatar'}
	<div
		transition:fly={{ x: screenWidth, duration: 500, opacity: 1 }}
		class="absolute w-full h-[calc(100vh-10rem)]"
	>
		<ChangeAvatar />
	</div>
{/if}
