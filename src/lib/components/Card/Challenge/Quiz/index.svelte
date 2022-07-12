<script>
	import Question from './Question.svelte';
	import Result from './Result.svelte';
	import { store } from '/src/stores/index';

	export let datum;
	export let height;
	export let width;
	export let cardId;

	const {
		value: { questions, title }
	} = datum;

	$: counter = 0;
	$: curQ = questions[counter];
	$: img = curQ?.img;
	$: quizInformation = {
		completed: false,
		date: new Date().getTime(),
		cardId: cardId,
		response: [],
		succeeded: false,
		type: 'Quiz',
		uid: $store.currentUser.uid,
		score: 0
	};

	/**
	 * Method to add the responses of the users in the object quizInformation
	 * @param resp - the user's reponse
	 */
	const updateQuizInfo = (resp) => {
		if (quizInformation.response.some((item) => Object.keys(item)[0] === Object.keys(resp)[0]))
			quizInformation.response.splice(quizInformation.response.indexOf(resp), 1);
		else quizInformation.response = [...quizInformation.response, resp];
	};
</script>

<div class="flex flex-col cont bg-white">
	{#if counter < questions.length}
		<Question
			{title}
			{img}
			{...curQ}
			onChange={(responseId) => updateQuizInfo(responseId)}
			{counter}
		/>

		<button
			class="mt-auto h-[10%] w-full bg-c-dark-brown text-xl p-3 text-white"
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
		max-width: 400px;
		height: 100vh;
		max-height: 600px;
	}
</style>
