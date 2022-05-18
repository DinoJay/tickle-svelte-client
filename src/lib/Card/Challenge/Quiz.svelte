<script>
	import { fade, slide, fly, blur } from 'svelte/transition';
	import Question from './Question.svelte';
	export let datum;
	export let height;
	export let width;

	const {
		value: { questions, title }
	} = datum;
	let counter = 0;
	$: curQ = questions[counter];
	// $: img = curQ.img;
	let response = [];

	$: console.log('resp', response);
</script>

<div class="bg-white flex flex-col" style="width:{width}px;height:{height}px">
	{#key curQ.id}
		<Question {title} {...curQ} {height} addResponse={(a) => (response[counter] = a)} />
		<button
			class="mt-auto w-full bg-gray-600 text-xl p-3 text-white"
			on:click={() => (counter += 1)}>Next Question</button
		>
	{/key}
</div>
