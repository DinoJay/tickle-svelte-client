<script>
	import { getAuth, signOut } from 'firebase/auth';
	import { fly } from 'svelte/transition';
	import SelectEnvironment from '$lib/components/environment/EnvironmentSelector.svelte';
	import { page } from '$app/stores';
	import { store } from '/src/stores/index';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/components/utils/clickOutside';
	import Logo from './Logo.svelte';
	import Burger from './Burger.svelte';

	$: envId = $page.params.envId;

	let collapsed = false;
	let selectEnvOpen = false;
	let mobileNavWidth;

	const logOut = () => {
		signOut(getAuth());
		window.location.href = '/';
	};

	/**
	 * Dynamic method to catch the size of the screen
	 * 0.4 - full screen mode => nav 40% of the screen
	 */
	onMount(() => {
		const getMobileNavWidth = () => {
			if (window.innerWidth > 640) {
				mobileNavWidth = window.innerWidth * 0.4;
			} else {
				mobileNavWidth = window.innerWidth;
			}
		};

		getMobileNavWidth();
		window.addEventListener('resize', () => {
			getMobileNavWidth();
		});
	});

	/**
	 * Reset the Navbar after a 'goto' redirection
	 */
	afterNavigate(() => {
		collapsed = false;
		selectEnvOpen = false;
	});

	let sections = [
		{
			name: 'Select environments',
			foo: () => {
				selectEnvOpen = !selectEnvOpen;
				collapsed = !collapsed;
			}
		},
		{ name: 'Home', foo: () => goto('/home') },
		{ name: 'Sign out', foo: () => logOut() }
	];
</script>

<nav
	class="flex items-center w-full h-16 bg-c-dark-brown text-white relative"
	use:clickOutside
	on:click_outside={() => (collapsed = false)}
>
	<Logo />

	<!-- Mobile NavBar -->
	{#if $store?.currentUser != undefined}
		<div class="block mt-1.5 absolute right-3">
			<Burger bind:collapsed />
		</div>

		{#if collapsed}
			<div
				transition:fly={{ x: mobileNavWidth, duration: 500, opacity: 1 }}
				class="flex flex-col sm:w-2/5 w-full h-auto  bg-c-brown absolute top-[4rem] right-0 z-20"
			>
				{#each sections as section}
					<button
						class="sm:h-10 sm:text-xl text-2xl h-14 border-b hover:underline"
						on:click={section.foo}
					>
						{section.name}
					</button>
				{/each}
			</div>
		{/if}

		<SelectEnvironment {envId} bind:open={selectEnvOpen} mandatory={false} />
	{/if}
</nav>

<style>
</style>
