<script>
	import ImageSearchOutline from 'svelte-material-icons/ImageSearchOutline.svelte';

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

<label class="mr-auto font-medium uppercase" for={labelFor}> {labelName} : </label>

<div class="flex flex-col h-auto w-full">
	<div class="mx-auto" on:click={() => fileInput.click()}>
		{#if bindObject.url != ''}
			<img
				class="m-auto h-[150px] max-w-full 
					object-cover 
					cursor-pointer hover:scale-105"
				src={bindObject.url}
				alt={bindObject.name}
			/>
		{:else}
			<p
				class="flex items-center 
                h-[150px] max-w-full
                m-auto italic text-center text-c-gray
				cursor-pointer hover:scale-105"
			>
				No image found for this card
				<br />
				Click to add an image
			</p>
		{/if}
	</div>

	<input
		type="file"
		name="picture"
		id="pictureFile"
		class="invisible"
		bind:this={fileInput}
		on:change={(e) => onFileSelected(e)}
	/>
	<label for="pictureAlt" class="mr-auto font-medium uppercase">Image alt :</label>
	<input
		class="w-full p-1
			border border-c-gray"
		type="text"
		name="pictureAlt"
		id="pictureAlt"
		bind:value={bindObject.name}
		on:change={() => onInput()}
	/>
</div>
