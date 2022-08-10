<script>
	import DeleteButton from '$lib/components/admin/utils/block/DeleteButton.svelte';

	export let isCard = false;
	export let onClick = () => {};
	export let ref = null;
</script>

<div
	class="flex 
        {isCard ? 'flex-col h-[14rem] w-[14rem] mx-auto' : 'h-12 w-full'}
        my-1 bg-white shadow-lg"
>
	<slot />

	<div class={isCard ? 'flex h-[2rem] w-full justify-center items-center' : 'my-auto'}>
		<DeleteButton {onClick} {ref} />
	</div>
</div>
