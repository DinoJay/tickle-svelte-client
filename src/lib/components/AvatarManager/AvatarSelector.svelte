<script>
	import avatars from '$lib/components/avatarManager/avatars';

	export let newUserAvatar = null;
	export let currentUserAvatar = null;
</script>

<div class="flex h-[5rem] overflow-auto">
	{#each avatars as avatar}
		<img
			class="w-[4rem] h-[4rem]  
				{newUserAvatar === avatar ? 'bg-c-green' : 'bg-white'}
				{currentUserAvatar === avatar ? 'bg-c-light-green cursor-not-allowed' : 'cursor-pointer'}"
			on:click={() => {
				newUserAvatar = avatar;
			}}
			src={'/avatars/' + avatar + '.svg'}
			alt={avatar}
		/>
	{/each}
</div>
