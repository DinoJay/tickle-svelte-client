<script>
	export let labelName = '';
	export let labelFor = '';
	export let bindObject = {};
	export let onInput = () => {};

	let fileInput;

	/**
	 * Read the file upload and convert it to a picture
	 * @param e - event
	 */
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			bindObject.url = e.target.result;
			onInput();
		};
	};
</script>

<label class="mr-auto font-medium" for={labelFor}> {labelName} : </label>

<div class="flex flex-col h-auto w-[100%] ">
	{#if bindObject.url != ''}
		<img
			class="m-auto h-[150px] max-w-[100%] object-cover"
			src={bindObject.url}
			alt={bindObject.name}
		/>
	{:else}
		<p
			class="flex items-center 
                h-[150px] max-w-[100%] 
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
		bind:value={bindObject.name}
		on:input={() => onInput()}
	/>
</div>
