<script>
	import { fade, slide, fly, blur } from 'svelte/transition';
	import Question from './Question.svelte';
	import Result from './Result.svelte';
	import { addNotification } from '/src/stores/notificationStore';
	export let datum;
	export let height;
	export let width;

	const {
		value: { questions, title }
	} = datum;

	console.log('questions', questions, 'title', title);
	let counter = 0;
	$: curQ = questions[counter];
	$: curResponse = response[counter];
	// $: img = curQ.img;
	let response = questions.map((q) => q.answers.map(() => false));
	let notification = null;

	$: console.log('resp', response);

	$: validResponse = !!curResponse.find((d) => !!d);

	$: console.log('resp', curResponse, validResponse);
</script>

<div class="bg-white flex flex-col cont">
	{#if counter < questions.length}
		<Question
			{title}
			{...curQ}
			response={response[counter]}
			addResponse={(a) => (response[counter] = a)}
		/>
		<button
			class="mt-auto w-full bg-gray-600 text-xl p-3 text-white"
			on:click={() => {
				addNotification({ text: 'Make sure that you select at least one answer!' });
			}}>Next Question</button
		>
	{:else}
		<Result {questions} {response} {title} />
	{/if}
</div>

<style>
	.cont {
		width: 100vw;
		max-width: 500px;
		height: 100vh;
		max-height: 600px;
	}
</style>
