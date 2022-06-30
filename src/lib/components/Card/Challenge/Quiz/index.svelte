<script>
	import Question from './Question.svelte';
	import Result from './Result.svelte';
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
				},
				{
					order: 619,
					id: 'f5f0cd71-2c2f-11ec-8bbe-a56976213bef',
					text: '1',
					correct: false
				}
			],
			text: 'How old I am?',
			wellFormatted: false,
			order: 602,
			id: 'f324e811-2c2f-11ec-8bbe-a56976213bef'
		}
	];

	$: counter = 0;
	$: curQ = questions[counter];
	$: img = curQ?.img;
	$: quizInformation = {
		completed: false,
		date: '',
		id: 'id activity sub',
		response: [],
		succeeded: false,
		type: 'Quiz',
		uid: 'user id',
		username: 'username'
	};

	const updateQuizInfo = (resp) => {
		if (quizInformation.response.some((item) => Object.keys(item)[0] === Object.keys(resp)[0]))
			quizInformation.response.splice(quizInformation.response.indexOf(resp), 1);
		else quizInformation.response = [...quizInformation.response, resp];
	};
</script>

<div class="bg-white flex flex-col cont">
	{#if counter < questions.length}
		<Question
			{title}
			{img}
			{...curQ}
			onChange={(responseId) => updateQuizInfo(responseId)}
			{counter}
		/>

		<button
			class="mt-auto w-full bg-gray-600 text-xl p-3 text-white"
			on:click={() => {
				counter++;
			}}
		>
			Next Question
		</button>
	{:else}
		<Result {questions} {quizInformation} {title} />
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
