<script>
	import { getAuth, signOut } from 'firebase/auth';
	import { scale, fly } from 'svelte/transition';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import SelectEnvironment from '$lib/components/environment/EnvironmentSelector.svelte';
	import { page } from '$app/stores';
	import { store } from '/src/stores/index';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';

	$: envId = $page.params.envId;

	let size = '32px';
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
</script>

<nav class="flex items-center w-full h-16 bg-c-dark-brown text-white relative">
	<h1 class="text-3xl mx-5 font-bold">
		<a class="flex items-center" href="/"> Tickle </a>
	</h1>

	<!-- Mobile NavBar -->
	{#if $store?.currentUser != undefined}
		<div class="block mt-1.5 absolute right-3">
			<button on:click={() => (collapsed = !collapsed)}>
				{#if !collapsed}
					<div in:scale>
						<Menu {size} />
					</div>
				{:else}
					<div in:scale>
						<Close {size} />
					</div>
				{/if}
			</button>
		</div>

		{#if collapsed}
			<div
				transition:fly={{ x: mobileNavWidth, duration: 500, opacity: 1 }}
				class="flex flex-col sm:w-2/5 w-full h-auto  bg-c-brown absolute top-[4rem] right-0 z-20"
			>
				<button
					class="sm:h-10 sm:text-xl text-2xl h-14 border-b hover:underline"
					on:click={() => (selectEnvOpen = !selectEnvOpen)}>Select environments</button
				>

				<button
					class="sm:h-10 sm:text-xl text-2xl h-14 border-b hover:underline"
					on:click={() => goto(`/home`)}>Home</button
				>

				<button class="sm:h-10 sm:text-xl text-2xl h-14  hover:underline" on:click={() => logOut()}
					>Sign out</button
				>
			</div>
		{/if}

		<SelectEnvironment {envId} bind:open={selectEnvOpen} mandatory={false} />
	{/if}
</nav>

<style>
</style>
