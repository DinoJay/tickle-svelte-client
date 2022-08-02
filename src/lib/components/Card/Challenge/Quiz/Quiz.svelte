<script>
	import Question from './Question.svelte';
	import Result from './Result.svelte';

	export let activity;
	export let activityInformation = {};

	const questions = activity.value.questions;
	const title = activity.value.title;

	$: counter = 0;
	$: curQ = questions[counter];
	$: img = curQ?.img;
	activityInformation.response = [];

	/**
	 * Method to add the responses of the users in the object activityInformation
	 * @param resp - the user's reponse
	 */
	const updateQuizInfo = (resp) => {
		if (activityInformation.response.some((item) => Object.keys(item)[0] === Object.keys(resp)[0]))
			activityInformation.response.splice(activityInformation.response.indexOf(resp), 1);
		else activityInformation.response = [...activityInformation.response, resp];
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
			class="h-[10%] w-full mt-auto bg-c-black
			 	text-xl p-3 text-white"
			on:click={() => {
				counter++;
			}}
		>
			Next Question
		</button>
	{:else}
		<Result {questions} {activityInformation} {title} />
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
