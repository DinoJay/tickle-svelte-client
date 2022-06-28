<script>
	import LightBox from '$lib/LightBox.svelte';
	import Quiz from './Challenge/Quiz/index.svelte';
	export let title;
	export let description;
	export let img;
	export let activity;

	let open = false;
	const width = 400;
	const height = 600;

	$: console.log('activity', activity);
	const getQuizProps = () => ({
		datum: activity,
		width: 400,
		height: 600
	});
</script>

<div class="border-2 p-3 bg-white flex flex-col" style="width:{400}px;height:{600}px">
	<h1 class="text-xl">{title}</h1>
	<img src={img} style="height:300px" alt={title} class="mb-3 object-contain w-full" />
	<p class="h-40 overflow-y-auto mb-3">{description}</p>
	<button on:click={() => (open = !open)} class="border-2 p-2 mt-auto text-xl w-full">
		Challenge
	</button>
</div>

{#if activity.value}
	<LightBox {open} {activity} {width} {height} close={() => (open = false)}>
		<Quiz {...getQuizProps()} />
	</LightBox>
{/if}
