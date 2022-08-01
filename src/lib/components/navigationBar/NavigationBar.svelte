<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { store } from '/src/stores/index';
	import { getAuth, signOut } from 'firebase/auth';
	import { afterNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/components/utils/clickOutside';
	import Logo from './Logo.svelte';
	import Burger from './Burger.svelte';
	import LoadEnvironments from '../utils/LoadEnvironments.svelte';
	import SelectEnvironment from '$lib/components/environment/EnvironmentSelector.svelte';

	$: selectedEnvironment = $page.params.environmentId;

	let collapsed = false;
	let selectEnvOpen = false;
	let mobileNavWidth = 0;
	let sections = [
		{
			name: 'Select environments',
			foo: () => {
				selectEnvOpen = !selectEnvOpen;
				collapsed = !collapsed;
			}
		},
		{ name: 'Home', foo: () => goto('/home') },
		{ name: 'Admin', foo: () => goto('/admin') },
		{ name: 'Sign out', foo: () => logOut() }
	];

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

	/**
	 * Function use to logout the user
	 */
	const logOut = () => {
		signOut(getAuth());
	};
</script>

<nav
	class="flex items-center h-16 w-full  
		bg-c-black text-white relative"
	use:clickOutside
	on:click_outside={() => (collapsed = false)}
>
	<Logo onClick={() => logOut()} />

	{#if $store?.currentUser}
		<div class="absolute right-3 top-4 ">
			<Burger bind:collapsed />
		</div>

		{#if collapsed}
			<div
				transition:fly={{ x: mobileNavWidth, duration: 500, opacity: 1 }}
				class="flex flex-col h-auto sm:w-[40%] w-full  
				 	absolute top-[4rem] right-0 z-20
					bg-c-dark-grey "
			>
				{#each sections as section}
					<button
						class="sm:h-10 sm:text-xl text-2xl h-14 
							border-b hover:underline"
						on:click={section.foo}
					>
						{section.name}
					</button>
				{/each}
			</div>
		{/if}

		<LoadEnvironments>
			<SelectEnvironment {selectedEnvironment} bind:isOpen={selectEnvOpen} isMandatory={false} />
		</LoadEnvironments>
	{/if}
</nav>
