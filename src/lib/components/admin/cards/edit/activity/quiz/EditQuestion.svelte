<script>
	import EditImage from '$lib/components/admin/utils/editBlocks/EditImage.svelte';
	import EditText from '$lib/components/admin/utils/editBlocks/EditText.svelte';

	export let height = 0;
	export let width = 0;
	export let question = {};
	export let saveActivity = () => {};

	const addAnswer = () => {
		question.answers = [...question.answers, { text: 'none', correct: false }];
	};

	const removeAnswer = (answer) => {
		question.answers.splice(question.answers.indexOf(answer), 1);
		question.answers = [...question.answers];
	};
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	<EditText
		labelName={'Title'}
		labelFor={'title'}
		bind:bindValue={question.text}
		onInput={() => saveActivity()}
	/>

	<EditImage
		labelName={'Image'}
		labelFor={'image'}
		bind:bindObject={question.img}
		onInput={() => saveActivity()}
	/>

	<div class="flex flex-col h-[30%] w-full mt-auto border border-c-gray">
		{#each question.answers as answer}
			<div class="flex h-10 w-full bg-c-light-gray mb-1">
				<input
					type="text"
					class="h-full w-[80%] px-1 overflow-auto bg-c-light-gray"
					bind:value={answer.text}
				/>
				<input type="checkbox" class="h-auto w-[7%] mx-1" bind:checked={answer.correct} />
				<div class="flex h-full w-[10%]">
					<p
						class="flex justify-center items-center m-auto h-8 w-8 
                    rounded-full bg-red-300 hover:bg-red-500 cursor-pointer"
						on:click={() => removeAnswer(answer)}
					>
						-
					</p>
				</div>
			</div>
		{/each}
	</div>

	<button
		class="h-[8%] w-full 
            bg-c-light-gray hover:bg-c-gray"
		on:click={() => addAnswer()}
	>
		Add an answer
	</button>
</div>
