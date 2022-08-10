<script>
	import { store } from '/src/stores/index';
	import CardsOutline from 'svelte-material-icons/CardsOutline.svelte';
	import AccountGroupOutline from 'svelte-material-icons/AccountGroupOutline.svelte';
	import ChartLine from 'svelte-material-icons/ChartLine.svelte';

	export let selectedIcon = '';
	export let onClick = () => {};

	let icons = ['cards', 'friends', 'progress', 'avatar'];
</script>

<div class="flex justify-center h-auto w-full bg-c-gray">
	{#each icons as icon}
		<div
			class="flex h-[5rem] w-[5rem] sm:mx-4 mx-1 my-2 bg-white hover:scale-110 cursor-pointer
			{selectedIcon == icon ? 'text-white filter-white bg-c-black' : ''}"
			on:click={() => onClick(icon)}
		>
			<span class="m-auto text-center">
				{#if icon == 'cards'}
					<CardsOutline size={56} />
					Cards
				{:else if icon == 'friends'}
					<AccountGroupOutline size={56} />
					Friends
				{:else if icon == 'progress'}
					<ChartLine size={56} />
					Progress
				{:else if icon == 'avatar'}
					{#if $store?.currentUser?.avatar}
						<img
							src="/avatars/{$store.currentUser.avatar}.svg"
							alt={$store.currentUser.avatar}
							class="w-[56px]"
						/>
					{/if}
					Avatar
				{/if}
			</span>
		</div>
	{/each}
</div>

<style>
	.filter-white img {
		filter: brightness(0) invert(1);
	}
</style>
