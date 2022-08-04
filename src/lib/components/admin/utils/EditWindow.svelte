<script>
	import { onMount } from 'svelte';
	import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

	export let fields = [];
	export let currentElement = {};
	export let collectionRef = null;
	export let docRef = null;

	let height = 600;
	let width = 400;
	let fileInput;
	let fieldImg = fields.find((field) => field.name == 'Image');

	/**
	 * LightBox height width for mobile
	 */
	onMount(() => {
		if (window.innerWidth < width) width = window.innerWidth;
		if (window.innerHeight < height) height = window.innerHeight;
	});

	/**
	 * Read the file upload and convert it to a picture
	 * @param e - event
	 */
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			currentElement[fieldImg.getter].url = e.target.result;
			saveElement();
		};
	};

	/**
	 * If it's a new element we create it in Firebase
	 * And we update the id of the current element with the created id
	 */
	if (currentElement.id == 'null') {
		addDoc(collectionRef, currentElement).then((newDocRef) => {
			updateDoc(newDocRef, {
				id: newDocRef.id
			});
			currentElement.id = newDocRef.id;
		});
	}

	/**
	 * It saves the element in Firebase when a value is changed
	 */
	async function saveElement() {
		let update = {};
		fields.forEach((field) => {
			update[field.getter] = currentElement[field.getter];
		});
		updateDoc(docRef, update);
	}
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	{#each fields as field}
		<div
			class="flex flex-col w-[90%]
            mx-auto mt-[3%]"
		>
			<label class="mr-auto font-medium" for={field.getter}> {field.name} : </label>

			{#if field.type == 'text'}
				<input
					class="w-full overflow-auto p-1
						border border-c-gray"
					type="text"
					name="edit-field"
					id={field.getter}
					bind:value={currentElement[field.getter]}
					on:input={() => saveElement()}
				/>
			{:else if field.type == 'textarea'}
				<textarea
					class="w-full overflow-auto border border-c-gray p-1"
					type="text"
					name="edit-field"
					id={field.getter}
					bind:value={currentElement[field.getter]}
					on:input={() => saveElement()}
				/>
			{:else if field.type == 'img'}
				<div class="flex flex-col h-auto w-[100%] ">
					{#if currentElement[field.getter].url != ''}
						<img
							class="m-auto h-[150px] max-w-[100%] object-cover"
							src={currentElement[field.getter].url}
							alt={currentElement[field.getter].name}
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
					<p class="mx-auto mt-auto cursor-pointer" on:click={() => fileInput.click()}>
						Choose image
					</p>
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
						bind:value={currentElement[field.getter].name}
						on:input={() => saveElement()}
					/>
				</div>
			{/if}
		</div>
	{/each}

	<slot />
</div>
