<script>
	import { fade, slide, fly, blur } from 'svelte/transition';
	import Question from './Question.svelte';
	import Result from './Result.svelte';
	import { addNotification } from '/src/stores/notificationStore';
	export let datum;
	export let height;
	export let width;

	const {
		value: { title }
	} = datum;

	let questions = [
		{
			answers: [
				{
					order: 615,
					id: 'f4f0ce70-2c2f-11ec-8bbe-a56976213bef',
					text: 'Jan',
					correct: true
				},
				{
					order: 616,
					id: 'f5f0ce70-2c2f-11ec-8bbe-a56976213bef',
					text: 'Thomas',
					correct: false
				}
			],
			text: 'What is my Name?',
			wellFormatted: false,
			order: 601,
			id: 'f324e810-2c2f-11ec-8bbe-a56976213bef'
		},
		{
			answers: [
				{
					order: 617,
					id: 'f4f0cb70-2c2f-11ec-8bbe-a56976213bef',
					text: '100',
					correct: false
				},
				{
					order: 618,
					id: 'f5f0cd70-2c2f-11ec-8bbe-a56976213bef',
					text: '35',
					correct: true
				}
			],
			text: 'How old I am?',
			wellFormatted: false,
			order: 602,
			id: 'f324e811-2c2f-11ec-8bbe-a56976213bef'
		}
	];

	let responses = questions.map((q) =>
		q.answers.map((answer) => {
			if (answer.correct) return answer.text;
		})
	);

	$: counter = 0;
	$: curQ = questions[counter];
	$: img = curQ?.img;
	$: userResponses = new Map();

	console.log('question', questions);
	$: console.log('resp', responses);
</script>

<div class="bg-white flex flex-col cont">
	{#if counter < questions.length}
		<Question {title} {img} {...curQ} bind:userResponses {counter} />

		<!-- 
		TODO :
		Faire le next question : incrementer counter + feeback ?
		Faire la page Result
		Mettre des animations -->
		<button
			class="mt-auto w-full bg-gray-600 text-xl p-3 text-white"
			on:click={() => {
				counter++;
			}}
		>
			Next Question
		</button>
	{:else}
		<Result {questions} {userResponses} {title} />
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
