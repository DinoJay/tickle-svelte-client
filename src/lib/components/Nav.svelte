<script>
	import { getAuth, signOut } from 'firebase/auth';
	import { scale, fly } from 'svelte/transition';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import SelectEnvironment from '$lib/components/SelectEnvironment/index.svelte';
	import { afterNavigate } from '$app/navigation';

	let size = '32px';
	let collapsed = false;
	let selectEnvOpen = false;

	const logOut = () => {
		const auth = getAuth();
		signOut(auth).catch((error) => {
			// An error happened.
		});
	};

	afterNavigate(() => {
		selectEnvOpen = false;
		collapsed = false;
	});
</script>

<nav class="flex items-center w-full h-16 bg-teal-500 text-white relative">
	<h1 class="text-3xl mx-5 font-bold">
		<a class="flex items-center" href="/"> Tickle </a>
	</h1>

	<!-- Mobile NavBar -->
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
			transition:fly={{ x: 350, duration: 500, opacity: 1 }}
			class="flex flex-col sm:w-2/5 w-full h-auto  bg-teal-300 absolute top-[64px] right-0 z-20"
		>
			<button
				class="sm:h-10 sm:text-xl text-2xl h-14  hover:underline"
				on:click={() => (selectEnvOpen = !selectEnvOpen)}>Select environments</button
			>
			<button class="sm:h-10 sm:text-xl text-2xl h-14  hover:underline" on:click={() => logOut()}
				>Sign out</button
			>
		</div>
	{/if}

	{#if selectEnvOpen}
		<SelectEnvironment bind:open={selectEnvOpen} />
	{/if}
</nav>

<style>
</style>
