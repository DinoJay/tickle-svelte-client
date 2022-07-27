<script>
	import avatars from '$lib/components/avatarManager/avatars';
	/**
	 * newUserAvatar - the new user's avatar
	 * currentUserAvatar - thus current user's avatar - if the user already has an avatar
	 */
	export let newUserAvatar = null;
	export let currentUserAvatar = null;
</script>

<div class="flex h-[5rem] overflow-auto">
	{#each avatars as avatar}
		<img
			class="w-[4rem] h-[4rem] cursor-pointer 
				{newUserAvatar === avatar ? 'bg-c-green' : ''}
				{currentUserAvatar === avatar ? 'bg-c-light-green' : ''}"
			on:click={() => {
				newUserAvatar = avatar;
			}}
			src={'/avatars/' + avatar + '.svg'}
			alt={avatar}
		/>
	{/each}
</div>
