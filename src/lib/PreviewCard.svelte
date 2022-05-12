<script>
	export let img;
	export let title;
</script>

<div class=" relative border-2 border-gray-600 p-2 drop-shadow-md">
	<div class="w-28 h-36 flex flex-col">
		<h1 class=" title">{title}</h1>
		<img class=" flex-grow object-cover" src={img} />
	</div>
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
