<script>
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

	/**
	 * Read the file upload and convert it to a picture
	 * @param e - event
	 */
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			question.img.url = e.target.result;
		};
	};

	let fileInput = false;
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	<label class="w-[90%] mt-[4%] mx-auto font-medium" for="title">Title : </label>

	<input
		class="w-[90%] mx-auto overflow-auto p-1
        border border-c-gray"
		type="text"
		name="edit-field"
		id="title"
		bind:value={question.text}
		on:input={() => saveActivity()}
	/>

	<!-- METTRE EN COMPOSANT -->
	<div class="flex flex-col h-auto w-[90%] m-auto">
		{#if question.img.url != ''}
			<img class="m-auto h-[120px] max-w-[100%]" src={question.img.url} alt={question.img.name} />
		{:else}
			<p
				class="flex items-center 
							h-[120px] max-w-[100%] 
							m-auto italic text-c-gray"
			>
				No image found for this card
			</p>
		{/if}
		<p class="mx-auto mt-auto cursor-pointer" on:click={() => fileInput.click()}>Choose image</p>
		<input
			type="file"
			name="picture"
			id="pictureFile"
			class="invisible"
			bind:this={fileInput}
			on:change={(e) => onFileSelected(e)}
		/>
		<label for="pictureAlt" class="mr-auto font-medium">Image alt :</label>
		<input
			class="w-full p-1
						border border-c-gray"
			type="text"
			name="pictureAlt"
			id="pictureAlt"
			bind:value={question.img.name}
		/>
	</div>

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
