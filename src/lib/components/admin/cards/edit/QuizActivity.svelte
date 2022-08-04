<script>
	import EditQuestion from './EditQuestion.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';

	export let height = 0;
	export let width = 0;
	export let questions = [];
	export let saveActivity = () => {};

	let editQuestion = false;
	let selectedQuestion = {};

	/**
	 * Add a new question to questions
	 */
	const addQuestion = () => {
		questions = [...questions, { answers: [], img: { url: '', name: '' }, text: 'empty question' }];
		saveActivity();
	};

	/**
	 * Remove a question from questions
	 * @param question
	 */
	const removeQuestion = (question) => {
		questions.splice(questions.indexOf(question), 1);
		questions = [...questions];
		saveActivity();
	};
</script>

<div
	class="flex flex-col h-[65%] w-full mt-auto overflow-y-auto
				border border-c-gray"
>
	{#each questions as question}
		<div class="flex h-[3rem] w-full mb-1 bg-c-light-gray ">
			<div
				class="flex h-full w-[90%]
						cursor-pointer hover:bg-c-gray"
				on:click={() => {
					selectedQuestion = question;
					editQuestion = true;
				}}
			>
				<p class="m-auto whitespace-nowrap text-ellipsis">
					{question?.text}
				</p>
			</div>
			<div class="flex h-full w-[10%]">
				<p
					class="flex justify-center items-center m-auto h-8 w-8 
							rounded-full bg-red-300 hover:bg-red-500 cursor-pointer"
					on:click={() => removeQuestion(question)}
				>
					-
				</p>
			</div>
		</div>
	{:else}
		<div class="m-auto font-medium">EMPTY</div>
	{/each}
</div>
<button
	class="h-[10%] w-full 
			bg-c-light-gray hover:bg-c-gray"
	on:click={() => addQuestion()}
>
	Add a question
</button>

<LightBox
	isOpen={editQuestion}
	close={() => {
		saveActivity();
		editQuestion = false;
	}}
>
	<EditQuestion
		{height}
		{width}
		saveActivity={() => saveActivity()}
		bind:question={selectedQuestion}
	/>
</LightBox>
