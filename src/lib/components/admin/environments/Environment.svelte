<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let currentEnvironment = {
		id: 'null',
		name: '',
		description: '',
		img: { name: '', url: '' }
	};

	let height = 600;
	let width = 400;
	let fileInput;

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
			currentEnvironment.img.url = e.target.result;
			saveEnvironment();
		};
	};

	/**
	 * If it's a new topic we create it in Firebase
	 * And we update the id of the current topic object with the created id
	 */
	if (currentEnvironment.id == 'null') {
		addDoc(collection(db, 'card-envs'), currentEnvironment).then((newDocRef) => {
			updateDoc(newDocRef, {
				id: newDocRef.id
			});
			currentEnvironment.id = newDocRef.id;
		});
	}

	/**
	 * It saves the topic in Firebase when a value is changed
	 */
	async function saveEnvironment() {
		let docRef = doc(db, 'card-envs', currentEnvironment.id);

		updateDoc(docRef, {
			name: currentEnvironment.name,
			description: currentEnvironment.description,
			img: currentEnvironment.img
		});
	}
</script>

<div class="flex flex-col bg-white" style="height: {height}px;width: {width}px;">
	<div
		class="flex flex-col w-[90%]
            mx-auto mt-[13%]"
	>
		<label class="mr-auto" for="title"> Name : </label>
		<input
			class="w-full border border-black"
			type="text"
			name="title"
			id="title"
			bind:value={currentEnvironment.name}
			on:input={() => saveEnvironment()}
		/>
	</div>

	<div
		class="flex flex-col w-[90%]
            mx-auto mt-[5%] "
	>
		<label class="mr-auto" for="description"> Description : </label>
		<textarea
			class="w-full border border-black"
			type="text"
			name="description"
			id="description"
			bind:value={currentEnvironment.description}
			on:input={() => saveEnvironment()}
		/>
	</div>

	<div class="flex flex-col w-[90%] h-[50%] mx-auto mt-[5%]">
		{#if currentEnvironment?.img?.url}
			<img
				class="m-auto max-h-[90%] max-w-[90%]"
				src={currentEnvironment.img.url}
				alt="Picture selected for the card"
			/>
		{:else}
			<p class="m-auto">No image found for this card</p>
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
	</div>

	<div
		class="flex flex-col w-[90%]
            mx-auto mt-[5%]"
	>
		<label for="pictureAlt">Image alt :</label>
		<input
			class="w-full border border-black"
			type="text"
			name="pictureAlt"
			id="pictureAlt"
			bind:value={currentEnvironment.img.name}
			on:input={() => saveEnvironment()}
		/>
	</div>
</div>
