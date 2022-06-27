<script>
	import avatars from '$lib/components/AvatarManager/avatars';
	export let userAvatar = null;
	export let currentUserAvatar = null;
</script>

{#each avatars as avatar}
	<img
		class="mx-2 h-14 w-auto cursor-pointer 
				{userAvatar === avatar ? 'bg-teal-500' : ''}
				{currentUserAvatar === avatar ? 'bg-teal-300 cursor-not-allowed' : ''}"
		on:click={() => {
			userAvatar = avatar;
		}}
		src={'/avatars/' + avatar + '.svg'}
		alt={avatar}
	/>
{/each}
