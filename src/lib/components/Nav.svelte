<script>
	import { getAuth, signOut } from 'firebase/auth';
	import { slide } from 'svelte/transition';

	let collapsed = false;

	const logOut = () => {
		const auth = getAuth();
		console.log(auth);
		signOut(auth).catch((error) => {
			// An error happened.
		});
	};
</script>

<nav transition:slide class="bg-teal-500 p-6 grow relative">
	<div class="flex">
		<div class="flex items-center flex-shrink-0 text-white mr-6">
			<span class="font-semibold text-xl tracking-tight">Tickle</span>
		</div>

		<div class="ml-auto">
			<button
				class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
				on:click={() => (collapsed = !collapsed)}
			>
				<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
					><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg
				>
			</button>
		</div>
	</div>

	{#if collapsed}
		<div class="w-full mt-3 px-3 py-2 bg-teal-500 absolute left-0 z-50" id="menu">
			<div class="text-sm lg:flex-grow" />
			<div>
				<button
					on:click={() => logOut()}
					class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
					>Sign out</button
				>
			</div>
		</div>
	{/if}
</nav>

<style>
</style>
