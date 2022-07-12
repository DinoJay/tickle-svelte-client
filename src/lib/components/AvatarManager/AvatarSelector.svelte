<script>
	import avatars from '$lib/components/avatarManager/avatars';
	export let userAvatar = null;
	export let currentUserAvatar = null;
</script>

<div class="flex h-[5rem] overflow-auto">
	{#each avatars as avatar}
		<img
			class="w-[4rem] h-[4rem] cursor-pointer 
				{userAvatar === avatar ? 'bg-c-green' : ''}
				{currentUserAvatar === avatar ? 'bg-c-light-green' : ''}"
			on:click={() => {
				userAvatar = avatar;
			}}
			src={'/avatars/' + avatar + '.svg'}
			alt={avatar}
		/>
	{/each}
</div>
