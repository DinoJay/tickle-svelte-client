<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let currentEnvironment = { id: 'null', name: '' };

	let height = 600;
	let width = 400;

	/**
	 * LightBox height width for mobile
	 */
	onMount(() => {
		if (window.innerWidth < width) width = window.innerWidth;
		if (window.innerHeight < height) height = window.innerHeight;
	});

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
			name: currentEnvironment.name
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
            mx-auto mt-[13%] "
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
</div>
