<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let selectedEnvironment;
	export let currentCard = {
		id: 'null',
		title: { key: 'title', value: '' },
		description: { label: 'Description', value: '' },
		img: { value: { name: '', url: '' } },
		activity: null,
		loc: { value: { longitude: 4.39, latitude: 50.82 } }
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
			currentCard.img.value.url = e.target.result;
			saveCard();
		};
	};

	/**
	 * If it's a new card we create it in Firebase
	 * And we update the id of the current card object with the created id
	 */
	if (currentCard.id == 'null') {
		addDoc(collection(db, 'card-envs', selectedEnvironment, 'cards'), currentCard).then(
			(newDocRef) => {
				updateDoc(newDocRef, {
					id: newDocRef.id
				});
				currentCard.id = newDocRef.id;
			}
		);
	}

	/**
	 * It saves the card in Firebase when a value is changed
	 */
	async function saveCard() {
		let docRef = doc(db, 'card-envs', selectedEnvironment, 'cards', currentCard.id);

		updateDoc(docRef, {
			title: currentCard.title,
			description: currentCard.description,
			img: currentCard.img
		});
	}
</script>

<div class="flex flex-col bg-white" style="height: {height}px;width: {width}px;">
	<div
		class="flex flex-col w-[90%]
            mx-auto mt-[13%]"
	>
		<label class="mr-auto" for="title"> Title : </label>
		<input
			class="w-full border border-black"
			type="text"
			name="title"
			id="title"
			bind:value={currentCard.title.value}
			on:input={() => saveCard()}
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
			bind:value={currentCard.description.value}
			on:input={() => saveCard()}
		/>
	</div>

	<div class="flex flex-col w-[90%] h-[50%] mx-auto mt-[5%]">
		{#if currentCard?.img?.value?.url}
			<img
				class="m-auto max-h-[90%] max-w-[90%]"
				src={currentCard.img.value.url}
				alt="Picture selected for the card"
			/>
		{:else}
			<p class="m-auto">No image found for this card</p>
		{/if}
		<label
			class="mx-auto mt-auto cursor-pointer"
			for="pictureFile"
			on:click={() => fileInput.click()}>Choose image</label
		>
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
			bind:value={currentCard.img.value.name}
			on:input={() => saveCard()}
		/>
	</div>
</div>
