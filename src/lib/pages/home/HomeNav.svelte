<script>
	import { store } from '/src/stores/index';
	import CardsOutline from 'svelte-material-icons/CardsOutline.svelte';
	import AccountGroupOutline from 'svelte-material-icons/AccountGroupOutline.svelte';
	import ChartLine from 'svelte-material-icons/ChartLine.svelte';

	export let selectedIcon;
	export let onClick;
</script>

<div class="flex justify-center h-auto w-full bg-c-cream">
	<div
		class="flex h-[5rem] w-[5rem] sm:mx-4 mx-1 my-2 bg-white hover:scale-110 cursor-pointer
		{selectedIcon == 'cards' ? 'border-2 border-c-dark-brown' : ''}"
		on:click={() => onClick('cards')}
	>
		<span class="m-auto text-center">
			<CardsOutline size={56} />
			Cards
		</span>
	</div>

	<div
		class="flex h-[5rem] w-[5rem] sm:mx-4 mx-1 my-2 bg-white hover:scale-110 cursor-pointer
		{selectedIcon == 'friends' ? 'border-2 border-c-dark-brown' : ''}"
		on:click={() => onClick('friends')}
	>
		<span class="m-auto text-center">
			<AccountGroupOutline size={56} />
			Friends
		</span>
	</div>

	<div
		class="flex h-[5rem] w-[5rem] sm:mx-4 mx-1 my-2 bg-white hover:scale-110 cursor-pointer
		{selectedIcon == 'progress' ? 'border-2 border-c-dark-brown' : ''}"
		on:click={() => onClick('progress')}
	>
		<span class="m-auto text-center">
			<ChartLine size={56} />
			Progress
		</span>
	</div>

	<div
		class="flex h-[5rem] w-[5rem] sm:mx-4 mx-1 my-2 bg-white hover:scale-110 cursor-pointer
		{selectedIcon == 'avatar' ? 'border-2 border-c-dark-brown' : ''}"
		on:click={() => onClick('avatar')}
	>
		<span class="m-auto text-center">
			{#if $store?.currentUser?.avatar}
				<img
					src="/avatars/{$store.currentUser.avatar}.svg"
					alt={$store.currentUser.avatar}
					class="w-[56px]"
				/>
			{/if}
			Avatar
		</span>
	</div>
</div>
