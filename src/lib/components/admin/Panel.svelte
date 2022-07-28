<script>
	import ArrowRightDropCircleOutline from 'svelte-material-icons/ArrowRightDropCircleOutline.svelte';

	/**
	 * title - The title of the panel
	 * selectedEnvironment - default : true, used to allow the user to expand the panel or not
	 * expanded - default : false, is the panel expanded or collapsed ?
	 */
	export let title = '';
	export let selectedEnvironment = true;

	let expanded = false;
</script>

<!-- Main block -->
<div
	class="panel-container h-[3rem]
		overflow-hidden 
		{expanded ? 'expanded' : ''}"
>
	<!-- Title container -->
	<div
		class="flex h-[3rem] w-full justify-center
		{selectedEnvironment ? 'bg-blue-300 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}"
		on:click={() => {
			if (selectedEnvironment) expanded = !expanded;
		}}
	>
		<!-- Icon -->
		<span
			class="my-auto mr-2
			{expanded ? 'rotate' : ''}"
		>
			<ArrowRightDropCircleOutline size={24} />
		</span>
		<!-- Title content -->
		<h1 class="my-auto text-xl">
			{title}
		</h1>
	</div>
	<!-- Body's block -->
	<div
		class="h-[37rem] w-full 
			bg-red-300"
	>
		<slot />
	</div>
</div>

<style>
	.panel-container {
		transition: all 0.3s ease;
	}

	.expanded {
		height: 40rem;
	}

	.rotate {
		transform: rotate(90deg);
	}
</style>
