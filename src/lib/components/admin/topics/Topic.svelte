<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let selectedEnvironment;
	export let currentTopic = { title: '', description: '', id: 'null' };

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
	if (currentTopic.id == 'null') {
		addDoc(collection(db, 'card-envs', selectedEnvironment, 'topics'), currentTopic).then(
			(newDocRef) => {
				updateDoc(newDocRef, {
					id: newDocRef.id
				});
				currentTopic.id = newDocRef.id;
			}
		);
	}

	/**
	 * It saves the topic in Firebase when a value is changed
	 */
	async function saveTopic() {
		let docRef = doc(db, 'card-envs', selectedEnvironment, 'topics', currentTopic.id);

		updateDoc(docRef, {
			title: currentTopic.title,
			description: currentTopic.description
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
			bind:value={currentTopic.title}
			on:input={() => saveTopic()}
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
			bind:value={currentTopic.description}
			on:input={() => saveTopic()}
		/>
	</div>
</div>
